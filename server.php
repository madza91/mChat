<?php
$host = 'localhost'; //host
$port = '9000'; //port
$null = NULL; //null var
$length = 5000;
$botName = 'assistent';

//Create TCP/IP stream socket
$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
//reusable port
socket_set_option($socket, SOL_SOCKET, SO_REUSEADDR, 1);

//bind socket to specified host
socket_bind($socket, '0.0.0.0', $port);

//listen to port
socket_listen($socket);

//create & add listening socket to the list
$clients = array($socket);
$users[] = [
    'nick' => $botName,
    'status' => 'online',
    'socket' => $socket
];

//start endless loop, so that our script doesn't stop
while (true) {
	//manage multiple connections
	$changed = $clients;
	//returns the socket resources in $changed array
	socket_select($changed, $null, $null, 0, 10);
	
	//check for new socket
	if (in_array($socket, $changed)) {
		$socket_new = socket_accept($socket); //accept new socket

		
		$header = socket_read($socket_new, $length); //read data sent by the socket
		$nickname = perform_handshaking($header, $socket_new, $host, $port); //perform web-socket handshake

        if (findUserID($nickname)) {
            // TODO Force it to change nickname to guest0-9
            send_message(['type' => 'system', 'message' => 'Your nick already exists, please change it']); //send join data
        } else {
            $clients[] = $socket_new; //add socket to client array

            send_message(['type' => 'users_list', 'users' => getUsers()], $socket_new); //send user list
            send_message(['type' => 'join', 'nick' => $nickname]); //send join data
            $users[] = [
                'nick' => $nickname,
                'status' => 'online',
                'socket' => $socket_new
            ];
        }

		debug('Connected new user: ' . $nickname);

		//make room for new socket
		$found_socket = array_search($socket, $changed);
		unset($changed[$found_socket]);
	}
	
	//loop through all connected sockets
	foreach ($changed as $changed_socket) {
		
		//check for any incoming data
		while(socket_recv($changed_socket, $buf, $length, 0) >= 1) {
			$received_text = unmask($buf); //unmask data
			$data = json_decode($received_text); //json decode 
			if ($data && isset($data->type)) {

			    switch ($data->type) {
                    case 'message':
                        $nickname = $data->name; //sender name
                        $message = $data->message; //message text

                        $firstChar = substr($message, 0, 1);
                        if (in_array($firstChar, ['@', '/'])) {
                            //command
                            $cmd = commands($changed_socket, $nickname, $message);
                            send_message($cmd['return'], $cmd['to']); //send data
                        } else {
                            debug($nickname . ' sends a message.');
                            //prepare data to be sent to client
                            send_message(['type'=>'user', 'nick'=>$nickname, 'message'=>$message]); //send data
                        }
                }

			}
			break 2; //exist this loop
		}
		
		$buf = @socket_read($changed_socket, 1024, PHP_NORMAL_READ);
		if ($buf === false) { // check disconnected client
			// remove client for $clients array
			$found_socket = array_search($changed_socket, $clients);

			$tmpUserID = findUserID($changed_socket, 'socket');
            debug('Disconnected user ' . $tmpUserID);
			
			//notify all users about disconnected connection
			send_message(['type'=>'leave', 'nick'=> $users[$tmpUserID]['nick']]);

            unset($clients[$found_socket]);
            unset($users[$tmpUserID]);
		}
	}
}
// close the listening socket
socket_close($socket);

function send_message($msg, $sendTo = false)
{
    if (!$msg) {
        return false;
    }
	global $clients;
    $maskedMsg = mask($msg);
    $length = strlen($maskedMsg);

	if ($sendTo) {
        @socket_write($sendTo, $maskedMsg, $length);
    } else { //send to all
        foreach($clients as $changed_socket)
        {
            @socket_write($changed_socket, $maskedMsg, $length);
        }
    }
	return true;
}


//Unmask incoming framed message
function unmask($text) {
	$length = ord($text[1]) & 127;
	if($length == 126) {
		$masks = substr($text, 4, 4);
		$data = substr($text, 8);
	}
	elseif($length == 127) {
		$masks = substr($text, 10, 4);
		$data = substr($text, 14);
	}
	else {
		$masks = substr($text, 2, 4);
		$data = substr($text, 6);
	}
	$text = "";
	for ($i = 0; $i < strlen($data); ++$i) {
		$text .= $data[$i] ^ $masks[$i%4];
	}
	return $text;
}

//Encode message for transfer to client.
function mask($text)
{
  $text = json_encode($text);
	$length = strlen($text);
  $b1 = 0x80 | (0x1 & 0x0f);
	
	if($length <= 125)
		$header = pack('CC', $b1, $length);
	elseif($length > 125 && $length < 65536)
		$header = pack('CCn', $b1, 126, $length);
	elseif($length >= 65536)
		$header = pack('CCNN', $b1, 127, $length);
	return $header.$text;
}

//handshake new client.
function perform_handshaking($received_header, $client_conn, $host, $port)
{
	$headers = array();
	$nickname = false;

	$lines = preg_split("/\r\n/", $received_header);
    foreach ($lines as $key => $line) {
        $line = chop($line);
        if (preg_match('/\A(\S+): (.*)\z/', $line, $matches)) {
            $headers[$matches[1]] = $matches[2];
        } else {
            if (!empty($line)) {
                $parsed = explode(' ', $line);
                if (count($parsed) === 3) {
                    list($method, $tmpNick, $http) = $parsed;
                    if (strlen($tmpNick) > 1) {
                        $nickname = ltrim($tmpNick, '/');
                    }
                }
            }
        }
    }

	$secKey = $headers['Sec-WebSocket-Key'];
	$secAccept = base64_encode(pack('H*', sha1($secKey . '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')));
	//hand shaking header
	$upgrade  = "HTTP/1.1 101 Web Socket Protocol Handshake\r\n" .
	"Upgrade: websocket\r\n" .
	"Connection: Upgrade\r\n" .
	"WebSocket-Origin: $host\r\n" .
	"WebSocket-Location: ws://$host:$port/demo/server.php\r\n".
	"Sec-WebSocket-Accept:$secAccept\r\n\r\n";
	socket_write($client_conn,$upgrade,strlen($upgrade));
	return $nickname;
}

function commands($client, $user, $message) {

    $return = [
        'type' => 'system',
        'message' => 'Unknown command'
    ];
    $sendTo = false;

    global $clients, $users;

    $firstChar = substr($message, 0, 1);
    $message = ltrim($message, $firstChar);
    if ($firstChar === '/') {
        $exploded = explode(' ', $message);

        $availableCommands = ['nick', 'me', 'hello', 'away', 'exit', 'disconnect', 'quit', 'whois', 'simulate', 'help'];
        $command = strtolower(getByKey($exploded, 0));
        if ($command || in_array($command, $availableCommands)) {
            switch ($command) {
                case 'nick':
                    $tmpNick = getByKey($exploded, 1);
                    if ($tmpNick) {

                        if (!in_array($tmpNick, $users)) {
                            $return = [
                                'type' => 'command',
                                'command' => 'nick',
                                'oldNick' => $user,
                                'newNick' => $tmpNick
                            ];

                            $found = array_search($user, $users);
                            if ($found !== false) {
                                $users[$found] = $tmpNick;
                            }
                        } elseif ($tmpNick === $user) {
                            $return['message'] = 'Ooops! You are already ' . $user . ', right?';
                        } else {
                            $return['message'] = 'That nickname already exists. Choose your own!';
                        }

                    } else {
                        $return['message'] = 'Incomplete command';
                    }
                    break;
                case 'clear':
                    $return = [
                        'type' => 'command',
                        'command' => 'clear'
                    ];
                    $sendTo = $client;
                    break;
                case 'disconnect':
                case 'exit':
                case 'quit':
                    disconnectClient($client);
                    $return = [
                        'type' => 'leave',
                        'nick' => $user
                    ];
                    break;
                case 'help':
                    $return = prepareMessage('Available commands: ' . implode(', ', $availableCommands));
                    $return['type'] = 'system';
                    $sendTo = $client;
                    break;
                case 'whois':
                    $tmpNick = getByKey($exploded, 1);
                    if ($tmpNick) {
                        if (in_array($tmpNick, $users)){
                            if ($user == $tmpNick) {
                                $return = prepareMessage('You forgot who you are?');
                            } else {
                                $return = prepareMessage('You don\'t want to know who is he! Trust me.');
                            }
                        } else {
                            $return = prepareMessage('That user even doesn\'t exists! lol');
                        }
                        $return['message'] = '@' . $user . ' ' . $return['message'];
                        $return['type'] = 'private';
                    } else {
                        $return['message'] = 'Incomplete command';
                    }
                    $sendTo = $client;
                    break;
                case 'simulate':
                    $tmpTotal = getByKey($exploded, 1, 1);
                    $tmpTotal = (is_numeric($tmpTotal)) ? $tmpTotal: 1;
                    $return = [
                        'type' => 'command',
                        'command' => 'simulate',
                        'action' => 'add_user',
                        'total' => $tmpTotal
                    ];
                    $sendTo = $client;
                    break;
                case 'away':
                    $message = substr($message, strlen($command) + 1);
                    $return = prepareMessage($message, $user);
                    $return['type'] = 'status';
                    $userID = findUserID($user);
                    $return['status'] = ($message == '') ? 'online': 'away';
                    $users[$userID]['status'] = $return['status'];
                    break;
                case 'me':
                    $message = ltrim($message, 'me');
                    $return = prepareMessage($user . $message, $user);
                    $return['type'] = 'system';
                    break;
                case 'hello':
                    $return = [
                        'type' => 'command',
                        'command' => 'noticeme',
                        'nick' => $user
                    ];
            }
        }

    } elseif ($firstChar === '@') {

        $exploded = explode(' ', $message);
        $tmpNick = getByKey($exploded, 0);
        if ($tmpNick) {
            $found_socket = array_search($tmpNick, $users);
            $tmpSocket = $clients[$found_socket];

            $return = [
                'type' => 'private',
                'message' => $firstChar . $message,
                'nick' => $user
            ];
            $sendTo = $tmpSocket;
        }

    }

    return ['return' => $return, 'to' => $sendTo];
}

function prepareMessage($message, $user = false) {
    global $botName;

    $user = (!$user) ? $botName: $user;
    return [
        'type' => 'user',
        'message' => $message,
        'nick' => $user
    ];
}

function findUserID($value, $by = 'nick') {
    global $users;
    $return = false;

    switch ($by) {
        case 'nick':
        case 'socket':
            $return = array_filter($users, function($v, $k) use ($by, $value) {
                return $v[$by] === $value;
            }, ARRAY_FILTER_USE_BOTH);
            break;
    }

    return (count($return)) ? key($return): false;
}

function getUsers() {
    global $users;
    $tmpUsers = [];

    foreach ($users as $key => $user) {
        unset($user['socket']);
        $tmpUsers[$key] = $user;
    }

    return $tmpUsers;
}

function disconnectClient($client) {
    global $clients;
    global $users;
    $found_socket = array_search($client, $clients);
    unset($clients[$found_socket]);
    unset($users[$found_socket]);
    socket_close($client);
}

function getByKey($array, $key, $default = false) {
    return (isset($array[$key])) ? trim($array[$key]): $default;
}

function debug($word) {
  echo $word . "\r\n";
}

function getLngMessage($id) {

}

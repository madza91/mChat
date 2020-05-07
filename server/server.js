/**
 * This is server file for Madza's tiny chat
 * This server uses Node and Socket.io
 * Run: node server.js
 * Author: Nemanja Madzovski
 * Date: 31.10.2017
 */

// var ogs = require('open-graph-scraper');
//
// var options = {'url': 'https://madza.rs'};
// ogs(options, function (error, results) {
//     console.log('error:', error); // This is returns true or false. True if there was a error. The error it self is inside the results object.
//     console.log('results:', results.data.ogImage);
// });
//

const env        = require('dotenv').config({path: __dirname + '/.env'});
const config     = env.parsed;
const expressApp = require('express')();
const https      = require('https');
const http       = require('http');
const fs         = require('fs');
const request    = require('request');
const debugging  = require('./modules/debugging');
const chatRoom   = 'general';
const msgLimit   = 20;
const msgHistory = [];
let server       = null;

// HTTPS Server
if (config.SERVER_SSL_KEY && config.SERVER_SSL_CERT) {
    server = https.createServer({
        key: fs.readFileSync(config.SERVER_SSL_KEY),
        cert: fs.readFileSync(config.SERVER_SSL_CERT)
    }, expressApp);
} else {
    debugging.log(`SSL Keys are not available, started not secure server`);
    server = http.createServer()
}


server.listen(config.SERVER_PORT,() => {
    debugging.log(`Started server on ${config.SERVER_HOST}, port ${config.SERVER_PORT}`);
});

// Socket Server
const io = require('socket.io')(server, {
    path: '/',
    serveClient: false
});

var users = [];
debugging.log('Adding bot named ' + config.BOT_NAME);
users.push({
    nick: config.BOT_NAME,
    status: 'online',
    socket: 'bot'
});

// New client connection
io.on('connection', function (socket) {
    const nickname = socket.handshake.query.nick;
    debugging.log(`Connected new user: ${nickname} (${socket.id})`);
    const validation = nickObj.validate(nickname);
    const nick = validation.nick;
    // socket.join(chatRoom)
    // io.to(chatRoom).emit('new user has joined the room');

    sendMessage('users_list',{users: users}, socket.id);
    sendMessage('welcome', { socket: socket.id, nick: nick }, socket.id);
    sendMessage('join', { nick: nick, status: 'online', socket: socket.id });
    users.push({
        nick: nick,
        status: 'online',
        socket: socket.id
    });

    const msgHistoryLimited = msgHistory.slice((msgHistory.length - msgLimit), msgHistory.length)
    sendMessage('history',{history: msgHistoryLimited}, socket.id);

    // Message from client
    socket.on("cMessage", function (data) {
        const user = nickObj.findUser(this.id, 'socket');

        if (data
          && typeof data.type !== 'undefined'
          && data.type === 'message'
          && data.message
        ) {
            var nickname  = user[0].nick;
            var message   = data.message;
            var firstChar = message.charAt(0);

            if (firstChar === '/') {
                var cmd = commands(socket, nickname, message);
                sendMessage(cmd.return.type, cmd.return, cmd.to);
            } else {
                debugging.log(nickname + ' sends a message.');
                const data = {
                    nick: nickname,
                    socket: socket.id,
                    message: message
                }
                sendMessage('user', data);
                addHistoryMessage('user', data)
            }
        }
    });

    socket.on('error', function () {
        nickObj.eventLeave(socket.id);
    });

    socket.on('disconnect', function () {
        nickObj.eventLeave(socket.id);
    });
});

function sendMessage(type, message, socketID) {
    if (typeof message === 'undefined' || message === '') {
        return;
    }
    message.date = Date.now();

    if (typeof socketID !== 'undefined') {
        // send message to specific client
        io.to(socketID).emit(type, message);
    } else {
        // send message to all connected clients
        io.sockets.emit(type, message);
    }
    return true;
}

function addHistoryMessage(type, data) {
    data.date = Date.now()
    msgHistory.push(data)
}

function commands(socket, user, message) {
    var socketID = socket.id;
    var preparedReturn = {
        type: 'system',
        message: 'Unknown command'
    };
    var sendTo = socketID;
    var availableCommands = ['nick', 'me', 'clear', 'hello', 'away', 'exit', 'disconnect', 'quit', 'whois', 'simulate', 'help', 'about'];

    var firstChar = message.charAt(0);

    if (firstChar === '/') {
        message = message.substr(1);
        var exploded = message.split(' ');

        if (availableCommands.indexOf(exploded[0]) !== -1) {
            switch (exploded[0]) {
                case 'nick':
                    var validation = nickObj.validate(exploded[1]);
                    if (validation.isValid === true) {
                        preparedReturn = {
                            type: 'command',
                            command: 'nick',
                            socket: socketID,
                            oldNick: user,
                            newNick: validation.nick
                        };
                        nickObj.changeUser(user, {nick: validation.nick});
                        emailSend(user, user + ' change name to ' + validation.nick);
                        sendTo = false;
                    } else {
                        preparedReturn.message = validation.reason;
                    }
                    break;
                case 'clear':
                    preparedReturn = {
                        type: 'command',
                        command: 'clear'
                    };
                    break;
                case 'disconnect':
                case 'exit':
                case 'quit':
                    socket.disconnect();
                    break;
                case 'help':
                    var commands = '<b>' + availableCommands.join('</b> <b>') + '</b>';
                    preparedReturn = {
                        type: 'system',
                        message: 'Available commands: ' + commands
                    };
                    break;
                case 'whois':
                    if (exploded[1]) {
                        var userID = nickObj.findUser(exploded[1], 'nick');
                        var isOnline = (userID.length > 0) ? 'online': 'offline';
                        preparedReturn = {
                            type: 'system',
                            message: 'This command is under development. We don\'t have info about this user, but it seems he is ' + isOnline
                        };
                    } else {
                        preparedReturn = {
                            type: 'system',
                            message: 'Uncompleted command. Please type in <b>/whois nick</b>.'
                        };
                    }
                    break;
                case 'simulate':
                    message = message.substr(9);
                    preparedReturn = {
                        type: 'command',
                        command: 'simulate',
                        action: 'add_user',
                        total: message
                    };
                    break;
                case 'away':
                    message = message.substr(5);
                    var tmpStatus = (message === '') ? 'online' : 'away';
                    preparedReturn = {
                        type: 'status',
                        message: message,
                        nick: user,
                        status: tmpStatus
                    };
                    sendTo = false;
                    nickObj.changeUser(user, {status: tmpStatus});
                    break;
                case 'me':
                    preparedReturn = {
                        type: 'system',
                        message: user + message.substr(2)
                    };
                    sendTo = false;
                    break;
                case 'hello':
                    preparedReturn = {
                        type: 'command',
                        command: 'noticeme',
                        nick: user
                    };
                    sendTo = false;
                    emailSend(user, user + ' is bored...');
                    break;
                case 'about':
                    preparedReturn = {
                        type: 'system',
                        message: 'Hello! This chat application is written by Nemanja Madžovski. You can contact me via contact form on http://madza.rs/ Thank you! :-)'
                    };
            }

        }

    } else if (firstChar === '@') {

        // TODO Private message
    }

    if (sendTo) {
        return {return: preparedReturn, to: sendTo};
    }
    return {return: preparedReturn};
}

function emailSend(nick, message) {
    if (config.EMAIL_ENABLED === true && config.EMAIL_SERVICE) {
        var token = Math.random().toString(36).substring(2);
        request.post(
            config.settings.emailService,
            { form: {name: nick, message: message, token: token} },
            function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    debugging.log(body)
                }
            }
        );
    }
}

var nickObj = {
    isValid: function (nick) {
        if (typeof nick === 'string') {
            return /^[0-9A-Za-z.-/-_!@#$%^&*()|<>?{}'"/[\]]{3,30}$/.test(nick);
        }
        return false;
    },
    getRandom: function () {
        return 'guest' + (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);
    },
    validate: function (nick) {
        var isValid = this.isValid(nick);
        var userID = this.findUser(nick, 'nick');
        var reason = isValid ? 'Chosen nickname already exists' : 'Chosen nickname is in invalid format. Check `/help nick` for detailed information.';
        if (isValid && userID.length === 0) {
            return {nick: nick, isValid: true, reason: null};
        } else {
            return {nick: this.getRandom(), isValid: false, reason: reason};
        }
    },
    findUser: function (value, by) {
        switch (by) {
            case 'nick':
                return users.filter(function (user) {
                    return user.nick === value;
                });
            case 'socket':
                return users.filter(function (user) {
                    return user.socket === value;
                });
        }
        return null;
    },
    removeUser: function (nick) {
        users = users.filter(function (user) {
            return user.nick !== nick;
        });
    },
    changeUser: function (nick, newValues) {
        if (newValues) {
            for (var u = 0; u < users.length; u++) {
                if (users[u].nick === nick) {
                    if (newValues.nick) {
                        users[u].nick = newValues.nick;
                    }
                    if (newValues.status) {
                        users[u].status = newValues.status;
                    }
                    break;
                }
            }
        }
    },
    eventLeave: function (sockedID) {
        var tmpClient = this.findUser(sockedID, 'socket');
        if (tmpClient.length > 0) {
            sendMessage('leave', {
                nick: tmpClient[0].nick,
                socket: sockedID
            });
            this.removeUser(tmpClient[0].nick);
            debugging.log(tmpClient[0].nick + ' is disconnected');
        }
    }
};

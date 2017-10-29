<?php
/**
 * Created by PhpStorm.
 * User: Nemanja
 * Date: 23-Oct-17
 * Time: 23:53
 */

/**
 * @param $message
 * @param bool $user
 * @return array
 */
function prepareMessage($message, $user = false) {
    global $botName;

    $user = (!$user) ? $botName: $user;
    return [
        'type' => 'user',
        'message' => $message,
        'nick' => $user
    ];
}

/**
 * @param $value
 * @param string $by
 * @return bool|int|null|string
 */
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

/**
 * @return array
 */
function getUsers() {
    global $users;
    $tmpUsers = [];

    foreach ($users as $key => $user) {
        unset($user['socket']);
        $tmpUsers[$key] = $user;
    }

    return $tmpUsers;
}

/**
 * @param $array
 * @param $key
 * @param bool $default
 * @return bool|string
 */
function getByKey($array, $key, $default = false) {
    return (isset($array[$key])) ? trim($array[$key]): $default;
}

/**
 * @param $nick
 * @return int
 */
function isValidNick($nick) {
    return preg_match('/^[0-9A-Za-z.]([\w ]+){3,20}$/', $nick);
}

/**
 * @param $word
 */
function debug($word) {
    echo $word . "\r\n";
}

/**
 * @param $id
 */
function getLngMessage($id) {

}
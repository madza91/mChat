/**
 * This is server file for Madza's tiny chat
 * This server uses Node and Socket.io
 * Run: node server.js
 * Author: Nemanja Madzovski
 * Date: 31.10.2017
 */

// Config
var port = 9000;
var botName = 'assistent';


debug('Starting server on localhost, port ' + port);
var io = require('socket.io').listen(port);

var users = [];
debug('Adding bot named ' + botName);
users.push({
    nick: botName,
    status: 'bot',
    socket: null
});

// New client connection
io.sockets.on('connection', function (socket) {
    if (typeof socket.handshake.query.user === 'string') {
        this.userNick = socket.handshake.query.user;
    } else {
        this.userNick = 'guest' + Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
    }

    debug('Connected new user: ' + this.userNick);
    send_message({type: 'users_list', users: users}, socket.id);
    send_message({type: 'join', nick: this.userNick});
    users.push({
        nick: this.userNick,
        status: 'online',
        socket: socket.id
    });


    socket.on("cMessage",function(data) {

        if (data && typeof data.type !== 'undefined') {
            switch (data.type) {
                case 'message':
                    var nickname = data.name;
                    var message = data.message;
                    var firstChar = message.charAt(0);

                    if (firstChat === '/' || firstChar === '@') {
                        var cmd = commands(nickname, message);
                        debug('command debug');
                    } else {
                        debug(nickname + ' sends a message.');
                        send_message({type: 'user', nick: nickname, message: message});
                    }
            }
        }

        debug('user sends message');
    });

    socket.on('error', function () {
        debug('Error for user ');
    });

    socket.on('disconnect', function () {
        debug('User is disconnected ');
    });
});

function debug(word) {
    var time = new Date;
    console.log('\033[31m[' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + ']\033[0m ' + word);
}

function send_message(message, socketID) {

    if (typeof message === 'undefined') {
        return;
    }

    if (typeof socketID !== 'undefined') {
        // send message to specific client
        io.to(socketID).emit("message", message);
    } else {
        // send message to all connected clients
        io.sockets.emit('sMessage', message);
    }
    return true;
}

function commands(user, message) {



}
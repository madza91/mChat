/**
 * This is server file for Madza's tiny chat
 * This server uses Node and Socket.io
 * Run: node server.js
 * Author: Nemanja Madzovski
 * Date: 31.10.2017
 */

var fs = require('fs');
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
var request = require('request');

debug('Starting server on localhost, port ' + config.server.port);
var io = require('socket.io').listen(config.server.port);

var users = [];
debug('Adding bot named ' + config.server.botName);
users.push({
    nick: config.server.botName,
    status: 'bot',
    socket: null
});

// New client connection
io.sockets.on('connection', function (socket) {

    var chosenNick = socket.handshake.query.user;
    var validation = nickObj.validate(chosenNick);
    this.nick = validation.nick;

    if (chosenNick !== this.nick) {
        send_message({
            type: 'command',
            command: 'nick',
            oldNick: chosenNick,
            newNick: this.nick,
            reason: validation.reason
        }, socket.id);
    }

    debug('Connected new user: ' + this.nick);
    send_message({type: 'users_list', users: users}, socket.id);
    send_message({type: 'join', nick: this.nick});
    emailSend(this.nick, 'Joined');
    users.push({
        nick: this.nick,
        status: 'online',
        socket: socket.id
    });


    socket.on("cMessage", function (data) {

        if (data && typeof data.type !== 'undefined' && data.type === 'message') {
            var nickname = data.name;
            var message = data.message;
            var firstChar = message.charAt(0);

            if (firstChar === '/' || firstChar === '@') {
                var cmd = commands(socket.id, nickname, message);
                send_message(cmd.return, cmd.to);
            } else {
                debug(nickname + ' sends a message.');
                send_message({type: 'user', nick: nickname, message: message});
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
        io.to(socketID).emit("sMessage", message);
    } else {
        // send message to all connected clients
        io.sockets.emit('sMessage', message);
    }
    return true;
}

function commands(socketID, user, message) {
    var preparedReturn = {
        type: 'system',
        message: 'Unknown command'
    };
    var sendTo = socketID;
    var availableCommands = ['nick', 'me', 'clear', 'hello', 'away', 'exit', 'disconnect', 'quit', 'whois', 'simulate', 'help'];

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
                    preparedReturn = {
                        type: 'leave',
                        nick: user
                    };
                    break;
                case 'help':
                    preparedReturn = {
                        type: 'command',
                        command: 'help',
                        commands: availableCommands
                    };
                    break;
                case 'whois':
                    // TODO create command
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
                        message: user + message.substr(2),
                        nick: user
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

    if (config.settings && config.settings.emailService && config.settings.sendEmail === true) {
        var token = Math.random().toString(36).substring(2);
        request.post(
            config.settings.emailService,
            { form: {name: nick, message: message, token: token} },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body)
                }
            }
        );
    }

}

var nickObj = {
    isValid: function (nick) {
        if (typeof nick === 'string') {
            return /^[0-9A-Za-z.]{3,20}$/.test(nick);
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
            send_message({type: 'leave', nick: tmpClient[0].nick});
            this.removeUser(tmpClient[0].nick);
            debug('User is disconnected ' + tmpClient[0].nick);
        }
    }
};
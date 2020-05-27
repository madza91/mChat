const helpers = require('./helpers');

module.exports = {
  call: function (socket, user, message) {
    let socketID = socket.id;
    let preparedReturn = {
      type: 'system',
      message: 'Unknown command'
    };
    let sendTo = socketID;
    let availableCommands = ['nick', 'me', 'clear', 'hello', 'away', 'exit', 'disconnect', 'quit', 'whois', 'simulate', 'help', 'about'];

    let firstChar = message.charAt(0);

    if (firstChar === '/') {
      message = message.substr(1);
      let exploded = message.split(' ');

      if (availableCommands.indexOf(exploded[0]) !== -1) {
        switch (exploded[0]) {
          case 'nick':
            var validation = helpers.validate(exploded[1]);
            if (validation.isValid === true) {
              preparedReturn = {
                type: 'command',
                command: 'nick',
                socket: socketID,
                oldNick: user,
                newNick: validation.nick
              };
              userList.changeUser(user, {nick: validation.nick});
              helpers.emailSend(user, user + ' change name to ' + validation.nick);
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
              var userID = userList.findByNick(exploded[1]);
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
            userList.changeUser(user, {status: tmpStatus});
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
            helpers.emailSend(user, user + ' is bored...');
            break;
          case 'about':
            preparedReturn = {
              type: 'system',
              message: 'Hello! This chat application is written by Nemanja Madžovski. You can contact me via contact form on http://madza.rs/ Thank you! :-)'
            };
        }
      }
    }

    if (sendTo) {
      return { return: preparedReturn, to: sendTo };
    }
    return { return: preparedReturn };
  }
};

const helpers = require('./helpers');

/**
 * ToDo: This is copied from an old Server, it requires refactoring
 * @type {{call: call}}
 */
module.exports = {
  call: function (Socket, User, message) {
    let sendTo = Socket.id;
    let preparedReturn = {
      type: 'system',
      message: 'Unknown command'
    };

    let availableCommands = ['nick', 'me', 'clear', 'hello', 'away', 'exit', 'disconnect', 'quit', 'whois', 'simulate', 'help', 'about'];
    let firstChar = message.charAt(0);

    if (firstChar === '/') {
      message = message.substr(1);
      let exploded = message.split(' ');

      if (availableCommands.indexOf(exploded[0]) !== -1) {
        switch (exploded[0]) {
          case 'nick':
            let validation = helpers.validate(exploded[1]);
            if (validation.isValid === true) {
              preparedReturn = {
                type: 'command',
                command: 'nick',
                id: User.id,
                oldNick: User.nick,
                newNick: validation.nick
              };
              userList.changeUser(User.nick, {nick: validation.nick});
              // helpers.emailSend(User.nick, User.nick + ' change name to ' + validation.nick);
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
            Socket.disconnect();
            break;
          case 'help':
            let commands = '<b>' + availableCommands.join('</b> <b>') + '</b>';
            preparedReturn = {
              type: 'system',
              message: 'Available commands: ' + commands
            };
            break;
          case 'whois':
            if (exploded[1]) {
              let userID = userList.findByNick(exploded[1]);
              let isOnline = (userID.length > 0) ? 'online': 'offline';
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
            let tmpStatus = (message === '') ? 'online' : 'away';
            preparedReturn = {
              type: 'command',
              command: 'status',
              message: message,
              userId: User.id,
              status: tmpStatus
            };
            sendTo = false;
            userList.changeUser(User.nick, { status: tmpStatus });
            break;
          case 'me':
            preparedReturn = {
              type: 'system',
              message: User.nick + message.substr(2)
            };
            sendTo = false;
            break;
          case 'hello':
            preparedReturn = {
              type: 'command',
              command: 'noticeme',
              nick: User
            };
            sendTo = false;
            helpers.emailSend(User, User + ' is bored...');
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

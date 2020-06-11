const helpers = require('./helpers');
const awayCommand = require('./commands/awayCommand');

/**
 * ToDo: This is copied from an old Server, it requires refactoring
 * @type {{call: call}}
 */
module.exports = {
  call: function (Socket, User, message) {
    const commandIdentifier = '/';
    const availableCommands = ['nick', 'me', 'clear', 'hello', 'away', 'exit', 'disconnect', 'quit', 'whois', 'simulate', 'help', 'about'];

    let sendTo = Socket.id;
    let preparedReturn = {
      type: 'system',
      message: 'Unknown command'
    };

    if (message.charAt(0) === commandIdentifier) {
      const command = message.substr(1).split(' ')[0];
      const params = message.substr(2).substr(command.length);

      switch (command) {
        case 'nick':
          let validation = helpers.validate(params);
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
          if (params) {
            let userID = userList.findByNick(params);
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
          preparedReturn = {
            type: 'command',
            command: 'simulate',
            action: 'add_user',
            total: params
          };
          break;
        case 'away':
          preparedReturn = awayCommand.run(User, params);
          sendTo = false;
          break;
        case 'me':
          preparedReturn = {
            type: 'system',
            message: User.nick + params
          };
          sendTo = false;
          break;
        case 'hello':
          preparedReturn = {
            type: 'command',
            command: 'noticeme',
            userId: User.id
          };
          sendTo = false;
          helpers.emailSend(User, User + ' is bored...');
          break;
        case 'about':
          preparedReturn = {
            type: 'system',
            message: 'Hello! This chat application is written by Nemanja Madžovski. You can contact me via contact form on https://madza.rs/ Thank you! :-)'
          };
      }
    }

    if (sendTo) {
      return { return: preparedReturn, to: sendTo };
    }
    return { return: preparedReturn };
  }
};

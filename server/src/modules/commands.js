const aboutCommand      = require('./commands/aboutCommand');
const awayCommand       = require('./commands/awayCommand');
const disconnectCommand = require('./commands/disconnectCommand');
const helloCommand      = require('./commands/helloCommand');
const helpCommand       = require('./commands/helpCommand');
const meCommand         = require('./commands/meCommand');
const nickCommand       = require('./commands/nickCommand');
const simulateCommand   = require('./commands/simulateCommand');
const whoisCommand      = require('./commands/whoisCommand');
const unknownCommand    = require('./commands/unknownCommand');

/**
 * Controller for all server commands
 * @param Socket
 * @param User
 * @param message
 * @returns {void|{type: string, message: string}|*}
 */
module.exports = (Socket, User, message) => {
  const commandIdentifier = '/';
  const availableCommands = ['nick', 'me', 'hello', 'away', 'exit', 'disconnect', 'quit', 'whois', 'simulate', 'help', 'about'];

  if (message.charAt(0) === commandIdentifier) {
    const command = message.substr(1).split(' ')[0];
    const params = message.substr(2).substr(command.length);

    switch (command) {
      case 'nick':
        return nickCommand(User, params);
      case 'help':
        return helpCommand(User, availableCommands);
      case 'whois':
        return whoisCommand(User, params);
      case 'simulate':
        return simulateCommand(User, params);
      case 'away':
        return awayCommand(User, params);
      case 'me':
        return meCommand(User, params);
      case 'hello':
        return helloCommand(User, params);
      case 'disconnect':
      case 'exit':
      case 'quit':
        return disconnectCommand(Socket);
      case 'about':
        return aboutCommand(User);
      default:
        return unknownCommand(User, availableCommands);
    }
  }

  return null;
};

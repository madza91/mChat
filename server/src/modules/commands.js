const aboutCommand      = require('./commands/aboutCommand');
const awayCommand       = require('./commands/awayCommand');
const disconnectCommand = require('./commands/disconnectCommand');
const dieCommand        = require('./commands/dieCommand');
const helloCommand      = require('./commands/helloCommand');
const helpCommand       = require('./commands/helpCommand');
const meCommand         = require('./commands/meCommand');
const nickCommand       = require('./commands/nickCommand');
const topicCommand      = require('./commands/topicCommand');
const versionCommand    = require('./commands/versionCommand');
const whoisCommand      = require('./commands/whoisCommand');
const unknownCommand    = require('./commands/unknownCommand');

/**
 * Controller for all server commands
 * @param Socket
 * @param User
 * @param data
 * @returns {void|{type: string, message: string}|*}
 */
module.exports = (Socket, User, data) => {
  const commandIdentifier = '/';
  const availableCommands = ['nick', 'me', 'hello', 'away', 'exit', 'disconnect', 'quit', 'whois', 'help', 'about'];
  const message = data.message;

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
      case 'away':
        return awayCommand(User, params);
      case 'me':
        return meCommand(User, data, params);
      case 'topic':
        return topicCommand(User, params);
      case 'hello':
        return helloCommand(User, params);
      case 'version':
        return versionCommand(User);
      case 'disconnect':
      case 'exit':
      case 'quit':
        return disconnectCommand(Socket);
      case 'die':
        return dieCommand(User);
      case 'about':
        return aboutCommand(User);
      default:
        return unknownCommand(User, availableCommands);
    }
  }

  return null;
};

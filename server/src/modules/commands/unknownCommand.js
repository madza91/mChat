const botEmit = require('../../sockets/emit/botEmit');

/**
 * User requested unknown command
 * @param User
 * @param availableCommands
 */
module.exports = (User, availableCommands) => {
  return botEmit(User, 'You are trying to call unknown command. Available commands: ' + '<b>' + availableCommands.join('</b> <b>') + '</b>');
};

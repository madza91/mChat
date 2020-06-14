const botEmit = require('../../sockets/emit/botEmit');

/**
 * User is asking for help, bot responses to him
 * @param User
 * @param availableCommands
 */
module.exports = (User, availableCommands) => {
  return botEmit(User, 'Available commands: ' + '<b>' + availableCommands.join('</b> <b>') + '</b>');
};

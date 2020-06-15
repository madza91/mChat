const botEmit = require('../../sockets/emit/botEmit');

/**
 * User requested unknown command
 * @param User
 */
module.exports = (User) => {
  return botEmit(User, 'You are trying to call unknown command. Please use <b>/help</b> to see all available commands.');
};

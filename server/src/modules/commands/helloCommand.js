const commandEmit = require('../../sockets/emit/commandEmit')

/**
 * User wants to be noticed - activates shake animation
 * @param User
 * @returns {*}
 */
module.exports = (User) => {
  // helpers.emailSend(User, User + ' is bored...');

  return commandEmit.toAll(User, 'noticeme');
};

const commandEmit = require('../../sockets/emit/commandEmit')

/**
 * User wants to be noticed - activates shake animation
 * @param User
 * @param nick
 * @returns {*}
 */
module.exports = (User, nick) => {
  // helpers.emailSend(User, User + ' is bored...');

  if (nick) {
    const foundUser = userList.findByNick(nick);

    if (foundUser) {
      return commandEmit.toUser(foundUser, 'noticeme', {
        userId: User.id
      });
    }

    return null;
  }
  return commandEmit.toAll(User, 'noticeme');
};

const serverCommandEmit = require('../../sockets/emit/serverCommandEmit')
const botEmit           = require('../../sockets/emit/botEmit');

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
      return serverCommandEmit.toUser(foundUser, 'noticeme', {
        userId: User.id
      });
    }

    return botEmit(User, `Hey, user with nick ${ nick } is not found, did you misspelled it?`)
  }

  return serverCommandEmit.toAll(User, 'noticeme');
};

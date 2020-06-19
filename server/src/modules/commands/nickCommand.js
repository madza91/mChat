const botEmit           = require('../../sockets/emit/botEmit');
const serverCommandEmit = require('../../sockets/emit/serverCommandEmit')
const helpers           = require('../helpers');

/**
 * User tries to change his nickname
 * @param User
 * @param nick
 * @returns {void|*}
 */
module.exports = (User, nick) => {
  const validation = helpers.validate(nick);

  if (validation.isValid === true) {
    const oldNick = User.nick;
    userList.changeUser(User.nick, { nick });

    return serverCommandEmit.toAll(User, 'nick', {
      id: User.id,
      oldNick,
      newNick: nick
    })
  }

  return botEmit(User, validation.reason);
};

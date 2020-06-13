const botEmit           = require('../../sockets/emit/botEmit');
const serverCommandEmit = require('../../sockets/emit/serverCommandEmit')
const helpers           = require('../helpers');

/**
 * User tryies to change his nickname
 * @param User
 * @param params
 * @returns {void|*}
 */
module.exports = (User, params) => {
  const validation = helpers.validate(params);

  if (validation.isValid === true) {
    userList.changeUser(User.nick, {nick: validation.nick});

    return serverCommandEmit.toAll(User, 'nick', {
      id: User.id,
      oldNick: User.nick,
      newNick: validation.nick
    })
  }

  return botEmit(User, validation.reason);
};

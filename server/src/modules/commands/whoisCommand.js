const botEmit = require('../../sockets/emit/botEmit');
const tableTemplate = require('../templates/tableTemplate');

/**
 * User requesting info about other user
 * @param User
 * @param params
 */
module.exports = (User, params) => {
  if (params) {
    const foundUser = userList.findByNick(params);

    if (foundUser) {
      return botEmit(User, tableTemplate({
        'Nick': foundUser.nick,
        'Joined': foundUser.joined,
        'Status': foundUser.status,
        'Away status': foundUser.statusMessage,
        'Messages': foundUser.totalMessages,
        'Idle': foundUser.idleFrom
      }));
    }

    return botEmit(User, 'I have not found that user, try again with another nick.');
  }

  return botEmit(User, 'Uncompleted command. Please type in <b>/whois nick</b>.');
};

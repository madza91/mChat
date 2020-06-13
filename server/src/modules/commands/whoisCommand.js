const botEmit = require('../../sockets/emit/botEmit');

/**
 * User requesting info about other user
 * @param User
 * @param params
 */
module.exports = (User, params) => {
  if (params) {
    const foundUser = userList.findByNick(params);
    const isOnline = foundUser ? 'online': 'offline';

    return botEmit(User, 'This command is under development. We don\'t have info about this user, but it seems he is ' + isOnline);
  }

  return botEmit(User, 'Uncompleted command. Please type in <b>/whois nick</b>.');
};

const serverCommandEmit = require('../../sockets/emit/serverCommandEmit')

/**
 * User changes his status to Online
 * @param User
 */
module.exports = (User) => {
  const tmpStatus = 'online';
  const foundUser = userList.findByNick(User.nick);
  foundUser.status = tmpStatus;
  foundUser.statusMessage = null;

  serverCommandEmit.toAll(User, 'status', {
    status: tmpStatus,
    message: null
  })
};

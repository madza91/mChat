const commandEmit = require('../../sockets/emit/commandEmit')

/**
 * User changes his status to Away
 * @param User
 * @param statusMessage
 */
module.exports = (User, statusMessage) => {
  const tmpStatus = (statusMessage === '') ? 'online' : 'away';
  const foundUser = userList.findByNick(User.nick);
  foundUser.status = tmpStatus;
  foundUser.statusMessage = statusMessage;

  commandEmit.toAll(User, 'status', {
    status: tmpStatus,
    message: statusMessage
  })
};

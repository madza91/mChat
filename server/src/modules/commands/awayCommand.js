const serverCommandEmit = require('../../sockets/emit/serverCommandEmit')

/**
 * User changes his status to Away
 * @param User
 * @param statusMessage
 */
module.exports = (User, statusMessage) => {
  const tmpStatus = (statusMessage === '') ? 'online' : 'away';
  const foundUser = userList.findByNick(User.nick);
  const strippedStatusMessage = statusMessage.replace(/(<([^>]+)>)/ig,"");
  foundUser.status = tmpStatus;
  foundUser.statusMessage = strippedStatusMessage;

  serverCommandEmit.toAll(User, 'status', {
    status: tmpStatus,
    message: strippedStatusMessage
  })
};

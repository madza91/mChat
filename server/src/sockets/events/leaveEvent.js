const debugging = require('../../modules/debugging');
const leaveEmit = require('../emit/serverLeaveEmit');

/**
 * Users leaves server
 * @param Socket
 */
module.exports = (Socket) => {
  const User = userList.findBySocket(Socket.id);
  if (User) {
    leaveEmit(Socket, User)
    userList.removeUser(User);
    debugging.log(`${ User.nick } is disconnected`);
  }
}

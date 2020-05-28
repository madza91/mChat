const debugging = require('../../modules/debugging');
const leaveEmit = require('../emit/serverLeaveEmit');

/**
 * Users leaves server
 * @param socket
 */
module.exports = (socket) => {
  const user = userList.findBySocket(socket.id);
  if (user) {
    leaveEmit(socket, user.nick)
    userList.removeUser(user);
    debugging.log(`${ user.nick } is disconnected`);
  }
}

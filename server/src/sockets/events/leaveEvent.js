const debugging = require('../../modules/debugging');
const leaveEmit = require('../emit/leaveEmit');

/**
 * Users leaves server
 * @param socketID
 */
module.exports = (socketID) => {
  const user = userList.findBySocket(socketID);
  if (user) {
    leaveEmit(socketID, user.nick)
    userList.removeUser(user);
    debugging.log(`${ user.nick } is disconnected`);
  }
}

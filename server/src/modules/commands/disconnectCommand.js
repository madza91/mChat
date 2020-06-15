/**
 * Disconnect user from server
 * Aliases: exit, quit
 * @param Socket
 * @returns {*}
 */
module.exports = (Socket) => {
  return Socket.disconnect();
};

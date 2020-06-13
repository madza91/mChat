/**
 * Emit channels list to the User
 * @param socketID
 * @returns {*}
 */
module.exports = (socketID) => {
  return io.to(socketID).emit('server_channels', channelList.getAll());
}

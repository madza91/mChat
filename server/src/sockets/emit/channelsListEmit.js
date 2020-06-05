/**
 * Emit channels list to the User
 * @param socketID
 * @returns {*}
 */
module.exports = (socketID) => {
  return io.to(socketID).emit('channels_list', channelList.getAll())
}

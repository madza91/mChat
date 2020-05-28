/**
 * Emit User has left the channel
 * @param channelTitle
 * @param socketID
 * @returns {*}
 */
module.exports = (channelTitle, socketID) => {
  return io.sockets.emit('channel_leave', {
    to: channelTitle,
    socket: socketID,
    date: Date.now()
  })
}

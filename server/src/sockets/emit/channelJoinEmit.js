/**
 * Emit User has joined the channel
 * @param channelTitle
 * @param socketID
 * @returns {*}
 */
module.exports = (channelTitle, socketID) => {
  return io.sockets.emit('channel_join', {
    to: channelTitle,
    socket: socketID,
    date: Date.now()
  })
}

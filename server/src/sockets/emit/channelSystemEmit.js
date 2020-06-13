/**
 * Emit system message to the channel
 * @param channelId
 * @param message
 * @returns {*}
 */
module.exports = (channelId, message) => {
  return io.sockets.emit('channel_system', {
    to: channelId,
    message: message,
    date: Date.now()
  });
}

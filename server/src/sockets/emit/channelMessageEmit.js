/**
 * Sends message to the Channel
 * @param channelTitle
 * @param message
 */
module.exports = (channelTitle, message) => {
  return io.to(channelTitle).emit('channel_message', message);
}

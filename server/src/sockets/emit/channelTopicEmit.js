/**
 * Emit new channel topic
 * @param channelId
 * @param topic
 * @returns {*}
 */
module.exports = (channelId, topic) => {
  return io.sockets.emit('channel_topic', {
    channelId,
    topic,
    date: Date.now()
  });
}

/**
 * Emit User has joined the channel
 * @param channelId
 * @param User
 * @returns {*}
 */
module.exports = (channelId, User) => {
  return io.sockets.emit('channel_join', {
    to: channelId,
    userId: User.id,
    date: Date.now()
  })
}

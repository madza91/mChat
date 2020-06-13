/**
 * Emit User has left the channel
 * @param channelTitle
 * @param User
 * @returns {*}
 */
module.exports = (channelTitle, User) => {
  return io.sockets.emit('channel_leave', {
    to: channelTitle,
    socket: User.id,
    date: Date.now()
  });
}

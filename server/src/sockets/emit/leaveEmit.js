/**
 * Emit to all users that 1 User has left the chat
 * @param socket
 * @param nick
 * @param reason
 * @returns {*}
 */
module.exports = (socket, nick, reason) => {
  return io.sockets.emit('leave', {
    socket: socket,
    nick: nick,
    reason: reason || 'unknown reason'
  })
}

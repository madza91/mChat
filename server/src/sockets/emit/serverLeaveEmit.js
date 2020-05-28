/**
 * Emit to all users that 1 User has left the chat
 * @param socket
 * @param nick
 * @param reason
 * @returns {*}
 */
module.exports = (socket, nick, reason) => {
  return io.sockets.emit('server_leave', {
    socket: socket.id,
    channels: Object.keys(socket.adapter.rooms),
    reason: reason || null
  })
}

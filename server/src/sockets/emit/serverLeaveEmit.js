/**
 * Emit to all users that 1 User has left the chat
 * @param Socket
 * @param User
 * @param reason
 * @returns {*}
 */
module.exports = (Socket, User, reason) => {
  return io.sockets.emit('server_leave', {
    userId: User.id,
    channels: Object.keys(Socket.adapter.rooms),
    reason: reason || null
  });
}

/**
 * Emit to all users that 1 User has joined the chat
 * @param User
 * @returns {*}
 */
module.exports = (User) => {
  return io.sockets.emit('server_join', User);
}

/**
 * Sends private message to the User
 * @param fromUser
 * @param toUser
 * @param message
 */
module.exports = (fromUser, toUser, message) => {
  if (fromUser.id !== toUser.id) {
    io.to(fromUser.socket).emit('private_message', message);
  }

  return io.to(toUser.socket).emit('private_message', message);
}

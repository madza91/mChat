/**
 * Emits command to the User(s)
 * @param User
 * @param command
 * @param additional
 * @returns {*}
 */
module.exports = {
  toUser: (User, command, additional) => {
    return io.to(User.socket).emit('server_command', {
      command: command,
      userId: User.id,
      date: Date.now(),
      ...additional
    });
  },
  toAll: (User, command, additional) => {
    return io.sockets.emit('server_command', {
      command: command,
      userId: User.id,
      date: Date.now(),
      ...additional
    });
  }
}

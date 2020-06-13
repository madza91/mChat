/**
 * Emits command to the User(s)
 * @param User
 * @param command
 * @param additional
 * @returns {*}
 */
module.exports = {
  toUser: (User, command, additional) => {
    io.to(User.socket).emit('command', {
      command: command,
      userId: User.id,
      date: Date.now(),
      ...additional
    });
  },
  toAll: (User, command, additional) => {
    return io.sockets.emit('command', {
      command: command,
      userId: User.id,
      date: Date.now(),
      ...additional
    })
  }
}

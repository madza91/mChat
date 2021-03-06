/**
 * Welcome message to the connected User
 * @param socketID
 * @param User
 * @returns {*}
 */
module.exports = (socketID, User) => {
  return io.to(socketID).emit('server_welcome', {
    user: {
      id: User.id,
      nick: User.nick,
      status: User.status,
      statusMessage: User.statusMessage,
      socket: User.socket
    },
    server: {
      build: serverBuild.getTime()
    },
    settings: {
      commands: commandsList
    }
  });
}

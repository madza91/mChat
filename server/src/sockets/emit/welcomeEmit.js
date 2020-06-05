/**
 * Welcome message to the connected User
 * @param socketID
 * @param User
 * @returns {*}
 */
module.exports = (socketID, User) => {
  return io.to(socketID).emit('welcome', {
    id: User.id,
    nick: User.nick
  })
}

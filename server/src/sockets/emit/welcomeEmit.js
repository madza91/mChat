/**
 * Welcome message to the connected User
 * @param socketID
 * @param userNick
 * @returns {*}
 */
module.exports = (socketID, userNick) => {
  return io.to(socketID).emit('welcome', {
    socket: socketID,
    nick: userNick
  })
}

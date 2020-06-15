/**
 * Emit users list to the User
 * @param socketID
 * @returns {*}
 */
module.exports = (socketID) => {
  return io.to(socketID).emit('server_users', userList.getAll());
}

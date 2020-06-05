/**
 * Emit users list to the User
 * @param socketID
 * @returns {*}
 */
module.exports = (socketID) => {
  return io.to(socketID).emit('users_list', userList.getAll())
}

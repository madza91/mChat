/**
 * Sends message to the Channel or User
 * @type {{private(*=, *=, *=): void, channel(*=, *=): void}}
 */
module.exports = {
  private(fromUser, toUser, message) {
    if (fromUser.id !== toUser.id) {
      io.to(fromUser.socket).emit('private', message);
    }
    io.to(toUser.socket).emit('private', message);
  },
  // For Channel, its title is ID
  channel(channelTitle, message) {
    io.to(channelTitle).emit('channel', message)
  }
}

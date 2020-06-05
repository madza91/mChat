/**
 * Sends message to the Channel or User
 * @type {{private(*=, *=, *=): void, channel(*=, *=): void}}
 */
module.exports = {
  private(fromSocketID, toSocketID, message) {
    if (fromSocketID !== toSocketID) {
      io.to(fromSocketID).emit('private', {...message, socket: toSocketID});
    }
    io.to(toSocketID).emit('private', message);
  },
  // For Channel, its title is ID
  channel(channelTitle, message) {
    io.to(channelTitle).emit('channel', message)
  }
}

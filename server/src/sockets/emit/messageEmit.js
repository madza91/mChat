/**
 * Sends message to the Channel or User
 * @type {{private(*=, *=, *=): void, channel(*=, *=): void}}
 */
module.exports = {
  private(fromSocketID, toSocketID, message) {
    io.to(fromSocketID).emit('private', {...message, socket: toSocketID});
    io.to(toSocketID).emit('private', message);
  },
  channel(channelID, message) {
    io.to(channelID).emit('channel', message)
  }
}

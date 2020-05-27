const helpers = require('../../modules/helpers');

module.exports = {
  message(type, message, socketID) {
    if (helpers.isMessageValid(message)) {
      message.date = Date.now();

      if (typeof socketID !== 'undefined') {
        // send message to specific client
        io.to(socketID).emit(type, message);
      } else {
        // send message to all connected clients
        io.sockets.emit(type, message);
      }

      return true;
    }

    return false;
  }
}

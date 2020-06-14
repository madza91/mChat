const disconnectCommand = require('../../modules/commands/disconnectCommand');

/**
 * Send nickname validation errors
 * @param Socket
 * @param message
 * @returns {*}
 */
module.exports = (Socket, message) => {
  io.to(Socket.id).emit('server_validation', {
    message: message,
    date: Date.now()
  });

  disconnectCommand(Socket);
}

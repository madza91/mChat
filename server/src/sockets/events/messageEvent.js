const debugging   = require('../../modules/debugging');
const commands    = require('../../modules/commands');
const send        = require('../emit/sendEmit');
const User        = require('../../classes/User');
const Message     = require('../../classes/Message');
const messageEmit = require('../emit/messageEmit');
const fileHandler = require('../../modules/fileHandler');

/**
 * When new User sends a message
 * @param socket
 * @param data
 * @returns {boolean}
 */
module.exports = (socket, data) => {
  const user = userList.findBySocket(socket.id);

  if (user && data && (data.message || data.attachment)) {
    const nickname  = user.nick;
    const message   = data.message;
    const isChannel = data.isChannel;
    const isCommand = (message) ? message.charAt(0) === '/': false;

    if (isCommand) {
      let cmd = commands.call(socket, nickname, message);
      send.message(cmd.return.type, cmd.return, cmd.to);
    } else {
      const messageData = new Message(socket.id, nickname, message, data.to)

      if (data.attachment) {
        fileHandler(socket, data, messageData.id);
      }

      if (isChannel) {
        messageEmit.channel(data.to, messageData);
        const myChannel = channelList.findByTitle(data.to);
        myChannel.addMessage(messageData);
        debugging.log(`${ nickname } sends a message to #${ myChannel._title }`);
      } else {
        // Private
        messageEmit.private(socket.id, data.to, messageData);
      }
    }

    return true;
  }

  debugging.log(`Message from ${ user.nick } is empty.`)
}

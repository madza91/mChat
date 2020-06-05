const debugging   = require('../../modules/debugging');
const commands    = require('../../modules/commands');
const send        = require('../emit/sendEmit');
const Message     = require('../../classes/Message');
const messageEmit = require('../emit/messageEmit');
const fileHandler = require('../../modules/fileHandler');

/**
 * When new User sends a message
 * @param Socket
 * @param data
 * @returns {boolean}
 */
module.exports = (Socket, data) => {
  const User = userList.findBySocket(Socket.id);

  if (User && data && (data.message || data.attachment)) {
    const nickname  = User.nick;
    const message   = data.message;
    const isChannel = data.isChannel;
    const isCommand = (message) ? message.charAt(0) === '/': false;

    // Process command and return response to the User
    if (isCommand) {
      let cmd = commands.call(Socket, User, message);

      return send.message(cmd.return.type, cmd.return, cmd.to);
    }

    const messageData = new Message(Socket.id, User.id, nickname, message, data.to);

    if (data.attachment) {
      fileHandler(Socket, data, messageData.id);
    }

    if (isChannel) {
      const Channel = channelList.findById(data.to);
      messageEmit.channel(Channel.title, messageData);
      Channel.addMessage(messageData);
      debugging.log(`${ nickname } sends a message to #${ Channel._title }`);
    } else {
      // Private
      const toUser = userList.findById(data.to);

      messageEmit.private(Socket.id, toUser.socket, messageData);
    }

    return true;
  }

  debugging.log(`Message from ${ user.nick } is empty.`)
}

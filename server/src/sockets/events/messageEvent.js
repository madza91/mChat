const escapeHtml         = require('escape-html');
const debugging          = require('../../modules/debugging');
const commands           = require('../../modules/commands');
const helpers            = require('../../modules/helpers');
const Message            = require('../../classes/Message');
const privateMessageEmit = require('../emit/privateMessageEmit');
const channelMessageEmit = require('../emit/channelMessageEmit');

/**
 * When new User sends a message
 * @param Socket
 * @param data
 * @returns {boolean}
 */
module.exports = (Socket, data) => {
  const User = userList.findBySocket(Socket.id);
  if (data.message) {
    data.message = escapeHtml(data.message.trim());
  }

  if (User && data && (data.message || data.attachment)) {
    const nickname  = User.nick;
    const message   = data.message;
    const isChannel = data.isChannel;
    const isCommand = (message) ? message.charAt(0) === '/': false;

    // Process command and return response to the User
    if (isCommand) {
      return commands(Socket, User, data);
    }

    const newMessage = helpers.emojiconify(message);
    const messageData = new Message(User.id, nickname, newMessage, data.attachment, data.to);

    if (isChannel) {
      const Channel = channelList.findById(data.to);
      channelMessageEmit(Channel.title, messageData);
      Channel.addMessage(messageData);
      debugging.log(`${ nickname } sends a message to #${ Channel._title }`);
    } else {
      // Private
      const toUser = userList.findById(data.to);

      privateMessageEmit(User, toUser, messageData);
    }

    // Update User info
    User.incrementMessages();
    User.updateIdleFrom();

    return true;
  }

  debugging.log(`Message from ${ User.nick } is empty.`)
}

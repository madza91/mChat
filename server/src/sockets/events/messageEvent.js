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
    data.message = prepareMessage(data.message);
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

    const messageData = new Message(User.id, nickname, message, data.attachment, data.to);

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

/**
 * Prepare message for processing
 * @param message
 * @returns {*}
 */
prepareMessage = (message) => {
  message.trim();
  message = helpers.emojiconify(message);

  return escapeHtml(message);
}

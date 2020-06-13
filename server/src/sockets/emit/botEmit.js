const privateMessageEmit = require('./privateMessageEmit');
const Message            = require('../../classes/Message');

/**
 * Bot sends a message to the User
 * @param User
 * @param message
 */
module.exports = (User, message) => {
  const fromBot = userList.findBySocket('bot');
  const messageData = new Message(fromBot.id, fromBot.nick, message, User.id);

  return privateMessageEmit(fromBot, User, messageData);
}

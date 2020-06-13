const channelSystemEmit = require('../../sockets/emit/channelSystemEmit');
const privateSystemEmit = require('../../sockets/emit/privateSystemEmit');
const Message = require('../../classes/Message');

/**
 * Send a message on channel or private chat as system message
 * @param User
 * @param data
 * @param params
 * @returns {{type: string, message: string}}
 */
module.exports = (User, data, params) => {
  if (data.isChannel) {
    return channelSystemEmit(data.to, `${ User.nick } ${ params }`);
  }

  const foundUser = userList.findById(data.to);

  if (foundUser) {
    const message = `${ User.nick } ${ params }`
    const messageData = new Message(User.id, User.nick, message, foundUser.id);

    return privateSystemEmit(User, foundUser, messageData);
  }
};

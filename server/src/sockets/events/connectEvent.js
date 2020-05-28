const debugging    = require('../../modules/debugging');
const helpers      = require('../../modules/helpers');
const User         = require('../../classes/User');
const Message      = require('../../classes/Message');
const channelsEmit = require('../emit/channelsEmit');
const usersEmit    = require('../emit/usersEmit');
const welcomeEmit  = require('../emit/welcomeEmit');
const serverJoinEmit = require('../emit/serverJoinEmit');
const channelJoinEmit = require('../emit/channelJoinEmit');
const messageEmit  = require('../emit/messageEmit');

/**
 * When new User is connected
 * @param socket
 * @returns {boolean}
 */
module.exports = (socket) => {
  const nickname = socket.handshake.query.nick;

  if (nickname) {
    debugging.log(`Connected new user: ${nickname} (${socket.id})`);
    const validation = helpers.validate(nickname);
    const nick = validation.nick;
    const user = new User(nick, 'online', socket.id)

    sendChatData(socket, nick);
    joinChannels(socket, nick);

    // To all online users
    serverJoinEmit(user)

    userList.add(user);

    return true;
  }

  debugging.log('User tried to connect without nick parameter.');
  socket.disconnect()
}

/**
 * Add Client to all available channels
 * @param socket
 * @param nick
 */
joinChannels = (socket, nick) => {
  const allChannels = channelList.getAllTitles();
  socket.join(allChannels, () => {
    debugging.log('Client has joined all channels.')

    allChannels.forEach(channelTitle => {
      channelJoinEmit(channelTitle, socket.id);
    })
  })
}

/**
 * @param socket
 * @param nick
 */
sendChatData = (socket, nick) => {
  welcomeEmit(socket.id, nick);
  channelsEmit(socket.id);
  usersEmit(socket.id);
}

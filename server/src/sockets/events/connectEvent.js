const debugging          = require('../../modules/debugging');
const helpers            = require('../../modules/helpers');
const User               = require('../../classes/User');
const serverChannelsEmit = require('../emit/serverChannelsEmit');
const serverUsersEmit    = require('../emit/serverUsersEmit');
const serverWelcomeEmit  = require('../emit/serverWelcomeEmit');
const serverJoinEmit     = require('../emit/serverJoinEmit');
const channelJoinEmit    = require('../emit/channelJoinEmit');

/**
 * When new User is connected
 * @param Socket
 * @returns {boolean}
 */
module.exports = (Socket) => {
  const nickname = Socket.handshake.query.nick;

  if (nickname) {
    debugging.log(`Connected new user: ${nickname} (${Socket.id})`);
    const validation = helpers.validate(nickname);
    const nick = validation.nick;
    const user = new User(nick, 'online', Socket.id)

    sendChatData(Socket, user);
    joinChannels(Socket, user);

    // To all online users
    serverJoinEmit(user)

    userList.add(user);

    return true;
  }

  debugging.log('User tried to connect without nick parameter.');
  Socket.disconnect()
}

/**
 * Add Client to all available channels
 * @param Socket
 * @param User
 */
joinChannels = (Socket, User) => {
  const allChannels = channelList.getAllTitles();
  Socket.join(allChannels, () => {
    debugging.log('Client has joined all channels.')

    allChannels.forEach(channelTitle => {
      const channel = channelList.findByTitle(channelTitle);
      channelJoinEmit(channel.id, User);
    })
  })
}

/**
 * @param Socket
 * @param User
 */
sendChatData = (Socket, User) => {
  serverWelcomeEmit(Socket.id, User);
  serverChannelsEmit(Socket.id);
  serverUsersEmit(Socket.id);
}

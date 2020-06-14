const channelTopicEmit = require('../../sockets/emit/channelTopicEmit');
const botEmit          = require('../../sockets/emit/botEmit');

/**
 * Changes the topic for a channel that you are on. It will be only for Admins.
 * Aliases: exit, quit
 * @param User
 * @param params
 * @returns {*}
 */
module.exports = (User, params) => {
  const channelTitle = params.replace(/ .*/,'');
  const foundChannel = channelList.findByTitle(channelTitle.slice(1));

  if (foundChannel) {
    const newChannelTopic = params.slice(channelTitle.length + 1)

    foundChannel.topic = newChannelTopic;
    channelTopicEmit(foundChannel.id, newChannelTopic);

    return botEmit(User, `You successfully changed topic for #${ foundChannel.title }`);
  }

  return botEmit(User, `Channel ${ channelTitle } is not found.`)
};

export const channelMutations = {
  // Set received channels
  setChannels (state, channels) {
    state.channels = channels
  },

  // Insert user message to channel
  insertChannelMessage (state, { to, from, nick, messageId, message, attachment, type, date }) {
    const Channel = state.channels.find(channel => channel._id === to)

    if (Channel) {
      Channel._history.push({
        from,
        nick,
        messageId,
        message,
        attachment,
        type,
        date
      })
    }
  },

  // Insert system message to channel
  insertChannelSystemMessage (state, { to, message, date }) {
    const Channel = state.channels.find(channel => channel._id === to)

    if (Channel) {
      Channel._history.push({
        message,
        date,
        type: 'system'
      })
    }
  },

  changeChannelTopic (state, { channelId, topic }) {
    const Channel = state.channels.find(channel => channel._id === channelId)

    if (Channel) {
      Channel._topic = topic
    }
  }
}

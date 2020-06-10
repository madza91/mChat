export const channelMutations = {
  // Set received channels
  setChannels (state, channels) {
    state.channels = channels
  },

  // Insert user message to channel
  insertChannelMessage (state, data) {
    const Channel = state.channels.find(channel => channel._id === data.to)

    if (Channel) {
      Channel._history.push({
        from: data.from,
        nick: data.nick,
        messageId: data.messageId,
        message: data.message,
        type: data.type,
        date: data.date
      })
    }
  },

  // Insert system message to channel
  insertChannelSystemMessage (state, data) {
    const Channel = state.channels.find(channel => channel._id === data.to)

    if (Channel) {
      Channel._history.push({
        message: data.message,
        date: data.date,
        type: 'system'
      })
    }
  }
}

export const channelMutations = {
  // Set received channels
  setChannels (state, channels) {
    state.channels = channels
  },

  // Insert user message to channel
  insertChannelMessage (state, data) {
    const channel = state.channels.find(channel => channel._title === data.to)

    if (channel) {
      channel._history.push({
        id: data.id,
        nick: data.nick,
        socket: data.socket,
        message: data.message,
        type: data.type,
        date: data.date
      })
    }
  },

  // Insert system message to channel
  insertChannelSystemMessage (state, data) {
    const channel = state.channels.find(channel => channel._title === data.to)

    if (channel) {
      channel._history.push({
        message: data.message,
        date: data.date,
        type: 'system'
      })
    }
  }
}

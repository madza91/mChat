export const getters = {
  getValidation (state) {
    return state.validation
  },
  getLoggedInUser (state) {
    return state.loggedInUser
  },
  getUserId (state) {
    return state.loggedInUser.id
  },
  getUserNick (state) {
    return state.loggedInUser.nick
  },
  getUserStatus (state) {
    return state.loggedInUser.status
  },
  getUserStatusMessage (state) {
    return state.loggedInUser.statusMessage
  },
  findUserById: (state) => (userId) => {
    return state.users.find(user => user._id === userId)
  },
  getUnreadMessageCount: (state) => {
    return state.users.filter(user => user._badge > 0).length
  },
  getCurrentMessages (state) {
    const { selectedChat, channels, users } = state

    if (selectedChat.isChannel) {
      const channel = channels.find(channel => channel._id === selectedChat.id)

      return channel ? channel._history : []
    }

    const user = users.find(user => user._id === selectedChat.data._id)

    return user ? user._history : []
  },
  getSelectedChat (state) {
    return state.selectedChat
  },
  getUsers (state) {
    return state.users
  },
  getChannels (state) {
    return state.channels
  },
  findChannelById: (state) => (channelId) => {
    return state.channels.find(channel => channel._id === channelId)
  },
  findChannelByTitle: (state) => (channelTitle) => {
    return state.channels.find(channel => channel._title === channelTitle)
  },
  getSettingsCommands (state) {
    return state.settings.commands
  }
}

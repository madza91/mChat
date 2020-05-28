export const getters = {
  getUserNick (state) {
    return state.nick
  },
  getUserSocketId (state) {
    return state.socketId
  },
  findUserBySocket: (state) => (socketId) => {
    return state.users.find(user => user._socket === socketId)
  },
  getCurrentMessages (state) {
    const { selectedChat, channels, users } = state

    if (selectedChat.isChannel) {
      const channel = channels.find(channel => channel._title === selectedChat.id)

      return channel ? channel._history : []
    }

    const user = users.find(user => user._socket === selectedChat.id)

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
  }
}

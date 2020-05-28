export const chatMutations = {
  setConnected (state, data) {
    state.connected = data
  },

  setAuthenticated (state, data) {
    state.authenticated = true
    state.nick = data.nick
    state.socketId = data.socket
  },

  setNick (state, nick) {
    state.nick = nick
  },

  setSelectedChat (state, data) {
    state.selectedChat = data
  }
}

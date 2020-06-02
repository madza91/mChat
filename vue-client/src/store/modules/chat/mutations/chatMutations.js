export const chatMutations = {
  setConnected (state, isConnected) {
    state.connected = isConnected

    if (isConnected) {
      state.reconnecting = false
    }
  },

  setReconnecting (state, isReconnecting) {
    state.reconnecting = isReconnecting
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

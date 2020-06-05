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

  setAuthenticated (state, userData) {
    state.authenticated = true
    state.loggedInUser = userData
  },

  setNick (state, nick) {
    state.loggedInUser.nick = nick
  },

  setSelectedChat (state, data) {
    state.selectedChat = data
  }
}

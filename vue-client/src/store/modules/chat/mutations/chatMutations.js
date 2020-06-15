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
    state.validation = null
    state.loggedInUser = userData
  },

  setNotAuthenticated (state) {
    state.authenticated = false
  },

  setValidation (state, message) {
    state.validation = message
  },

  setNick (state, nick) {
    state.loggedInUser.nick = nick
  },

  setStatus (state, { status, message }) {
    state.loggedInUser.status = status
    state.loggedInUser.statusMessage = message
  },

  setSelectedChat (state, data) {
    state.selectedChat = data
  }
}

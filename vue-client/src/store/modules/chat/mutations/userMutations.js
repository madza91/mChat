export const userMutations = {
  insertUser (state, user) {
    state.users.push(user)
  },

  setUsers (state, users) {
    state.users = users
  },

  resetUsers (state) {
    state.users = []
  },

  removeUser (state, data) {
    state.users = state.users.filter(user => user._socket !== data.socket)
  },

  insertUserMessage (state, data) {
    const user = state.users.find(user => user._socket === data.socket)

    if (user) {
      user._history.push({
        message: data.message,
        nick: data.nick,
        socket: data.socket,
        to: data.to,
        date: data.date,
        type: 'user'
      })
    }
  },

  renameUser (state, data) {
    const user = state.users.find(user => user._socket === data.socket)

    user._nick = data.newNick
  },

  incrementUserBadge (state, data) {
    const user = state.users.find(user => user._socket === data.socket)

    if (user) {
      user._badge += 1
    }
  },

  resetUserBadge (state, socketId) {
    const user = state.users.find(user => user._socket === socketId)

    if (user) {
      user._badge = 0
    }
  }
}

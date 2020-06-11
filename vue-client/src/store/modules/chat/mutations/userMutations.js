export const userMutations = {
  /**
   * @param state
   * @param user
   */
  insertUser (state, user) {
    state.users.push(user)
  },

  /**
   * @param state
   * @param users
   */
  setUsers (state, users) {
    state.users = users
  },

  /**
   * @param state
   */
  resetUsers (state) {
    state.users = []
  },

  /**
   * @param state
   * @param userId
   */
  removeUser (state, userId) {
    state.users = state.users.filter(user => user._id !== userId)
  },

  /**
   * @param state
   * @param data
   */
  insertUserMessage (state, data) {
    const user = state.users.find(user => user._id === data.to)

    if (user) {
      user._history.push({
        from: data.from,
        message: data.message,
        nick: data.nick,
        to: data.to,
        date: data.date,
        type: 'user'
      })
    }
  },

  /**
   * @param state
   * @param data
   */
  renameUser (state, data) {
    const user = state.users.find(user => user._id === data.id)

    user._nick = data.newNick
  },

  /**
   * @param state
   * @param data
   */
  incrementUserBadge (state, data) {
    const user = state.users.find(user => user._id === data.from)

    if (user) {
      user._badge += 1
    }
  },

  /**
   * @param state
   * @param userId
   */
  resetUserBadge (state, userId) {
    const User = state.users.find(user => user._id === userId)

    if (User) {
      User._badge = 0
    }
  },

  setUserStatus (state, data) {
    const User = state.users.find(user => user._id === data.userId)

    if (User) {
      User._status = data.status
      User._statusMessage = data.message
    }
  }
}

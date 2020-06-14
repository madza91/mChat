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
    const User = state.users.find(user => user._id === data.to)

    if (User) {
      User._history.push({
        from: data.from,
        message: data.message,
        nick: data.nick,
        to: data.to,
        date: data.date,
        type: data.type || 'user'
      })
    }
  },

  /**
   * @param state
   * @param data
   */
  insertUserSystem (state, data) {
    const User = state.users.find(user => user._id === data.to)

    if (User) {
      User._history.push({
        from: data.from,
        message: data.message,
        nick: data.nick,
        to: data.to,
        date: data.date,
        type: 'system'
      })
    }
  },

  /**
   * @param state
   * @param data
   */
  renameUser (state, data) {
    const User = state.users.find(user => user._id === data.id)

    if (User) {
      User._nick = data.newNick
    }
  },

  /**
   * @param state
   * @param data
   */
  incrementUserBadge (state, data) {
    const User = state.users.find(user => user._id === data.from)

    if (User) {
      User._badge += 1
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
  },

  setUserNoticeMe (state, userId) {
    const User = state.users.find(user => user._id === userId)

    if (User) {
      User._noticeMe = true
      setTimeout(() => {
        User._noticeMe = false
      }, 1500)
    }
  }
}

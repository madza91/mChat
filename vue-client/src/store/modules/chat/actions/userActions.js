export const userActions = {
  userLeave ({ commit, getters }, data) {
    const user = getters.findUserBySocket(data.socket)

    if (user) {
      data.channels.forEach((channelTitle) => {
        commit('insertChannelSystemMessage', {
          to: channelTitle,
          message: `${user._nick} has left the room.`,
          date: data.date
        })
      })
    }

    commit('removeUser', data)
  },

  userMessage ({ commit, getters }, data) {
    commit('insertUserMessage', data)

    if (getters.getSelectedChat.id !== data.socket) {
      commit('incrementUserBadge', data)
    }
  },

  userRename ({ dispatch, getters }, data) {
    const user = getters.findUserBySocket(data.socket)

    dispatch('setUserNick', user.nick)
  }
}

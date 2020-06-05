export const userActions = {
  userLeave ({ commit, getters }, data) {
    const User = getters.findUserById(data.userId)

    if (User) {
      data.channels.forEach((channelTitle) => {
        commit('insertChannelSystemMessage', {
          to: channelTitle,
          message: `${User._nick} has left the room.`,
          date: data.date
        })
      })
    }

    commit('removeUser', User._id)
  },

  userMessage ({ commit, getters }, data) {
    commit('insertUserMessage', data)

    if (![data.from, data.to].includes(getters.getSelectedChat.id)) {
      commit('incrementUserBadge', data)
    }
  },

  userRename ({ dispatch, getters }, data) {
    const User = getters.findUserById(data.userId)

    dispatch('setUserNick', User.nick)
  }
}

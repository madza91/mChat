export const userActions = {
  userLeave ({ commit, getters }, data) {
    const User = getters.findUserById(data.userId)

    if (User) {
      data.channels.forEach((channelTitle) => {
        const Channel = getters.findChannelByTitle(channelTitle)

        if (Channel) {
          commit('insertChannelSystemMessage', {
            to: Channel._id,
            message: `${User._nick} has left the room.`,
            date: data.date
          })
        }
      })
    }

    commit('setUserStatus', {
      userId: User._id,
      status: 'offline',
      message: null
    })
  },

  userMessage ({ commit, getters }, data) {
    const toWindow = (getters.getUserId === data.to) ? data.from : data.to
    commit('insertUserMessage', { ...data, to: toWindow })

    if (toWindow !== getters.getSelectedChat.id) {
      commit('incrementUserBadge', data)
    }
  },

  userRename ({ dispatch, getters }, data) {
    const User = getters.findUserById(data.userId)

    dispatch('setUserNick', User.nick)
  },

  userRemove ({ commit, dispatch }, userId) {
    commit('removeUser', userId)
    dispatch('setSelectedChat', {
      id: 1,
      isChannel: true
    })
  }
}

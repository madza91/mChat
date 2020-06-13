export const chatActions = {
  setUserNick ({ commit }, nick) {
    commit('setNick', nick)
  },

  setSelectedChat ({ commit, getters }, data) {
    let chatWindow = null

    if (data.isChannel) {
      chatWindow = getters.findChannelById(data.id)
    } else {
      chatWindow = getters.findUserById(data.id)
      commit('resetUserBadge', data.id)
    }

    commit('setSelectedChat', {
      ...data,
      data: chatWindow
    })
  },

  setConnected ({ commit, dispatch, getters }, isConnected) {
    commit('setConnected', isConnected)

    if (!isConnected) {
      dispatch('callCommand', {
        command: 'status',
        status: 'offline',
        userId: getters.getUserId
      })
    }
  }
}

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
  }
}

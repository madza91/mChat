export const chatActions = {
  setUserNick ({ commit }, nick) {
    commit('setNick', nick)
  },

  setSelectedChat ({ commit }, data) {
    commit('setSelectedChat', data)

    if (!data.isChannel) {
      commit('resetUserBadge', data.id)
    }
  }
}

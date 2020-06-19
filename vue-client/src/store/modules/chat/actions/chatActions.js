import detectMobileMixin from '../../../../mixins/DetectMobileMixin'

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

    if (!detectMobileMixin.methods.isMobile()) {
      document.getElementById('message-to-send').focus()
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
  },

  resetValidation ({ commit }) {
    commit('setValidation', null)
  }
}

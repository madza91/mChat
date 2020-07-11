import detectMobileMixin from '../../../../mixins/DetectMobileMixin'
import windowMixin from '../../../../mixins/WindowMixin'

export const chatActions = {
  setUserNick ({ commit }, nick) {
    commit('setNick', nick)
  },

  setSelectedChat ({ commit, getters }, data) {
    let chatWindow = null
    let newWindowTitle = null

    if (data.isChannel) {
      chatWindow = getters.findChannelById(data.id)
      newWindowTitle = `#${chatWindow._title}`
    } else {
      chatWindow = getters.findUserById(data.id)
      newWindowTitle = chatWindow._nick
      commit('resetUserBadge', data.id)
    }

    if (!detectMobileMixin.methods.isMobile()) {
      document.getElementById('message-to-send').focus()
    }

    if (newWindowTitle) {
      windowMixin.methods.setTitle(newWindowTitle)
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

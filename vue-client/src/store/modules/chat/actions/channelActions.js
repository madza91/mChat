import { myMixin } from '../../../../mixins/NotificationMixin'

export const channelActions = {
  insertChannelMessage ({ commit, getters }, data) {
    if (data.socket && data.socket !== getters.getUserSocketId) {
      myMixin.methods.sendNotification(data.message)
    }

    commit('insertChannelMessage', data)
  },

  insertChannelJoin ({ commit, getters }, data) {
    const user = getters.findUserBySocket(data.socket)

    if (user) {
      commit('insertChannelSystemMessage', {
        to: data.to,
        message: `${user._nick} has joined the room.`,
        date: data.date
      })
    }
  },

  insertChannelLeave ({ commit, getters }, data) {
    const user = getters.findUserBySocket(data.socket)

    if (user) {
      commit('insertChannelSystemMessage', {
        to: data.to,
        message: `${user._nick} has left the room.`,
        date: data.date
      })
    }
  }
}

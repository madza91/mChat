import { myMixin } from '../../../../mixins/NotificationMixin'

export const channelActions = {
  insertChannelMessage ({ commit, getters }, data) {
    if (data.from !== getters.getLoggedInUser.id) {
      myMixin.methods.sendNotification(data.message)
    }

    commit('insertChannelMessage', data)
  },

  insertChannelJoin ({ commit, getters }, data) {
    const User = getters.findUserById(data.userId)

    if (User) {
      commit('insertChannelSystemMessage', {
        to: data.to,
        message: `${User._nick} has joined the room.`,
        date: data.date
      })
    }
  },

  insertChannelLeave ({ commit, getters }, data) {
    const User = getters.findUserById(data.userId)

    if (User) {
      commit('insertChannelSystemMessage', {
        to: data.to,
        message: `${User._nick} has left the room.`,
        date: data.date
      })
    }
  }
}

import { myMixin } from '../../../../mixins/NotificationMixin'

export const channelActions = {
  insertChannelMessage ({ commit, getters }, data) {
    if (data.from !== getters.getLoggedInUser.id) {
      myMixin.methods.sendNotification(data.message)
    }

    commit('insertChannelMessage', data)
  },

  insertChannelJoin ({ commit, getters }, { to, userId, date }) {
    const User = getters.findUserById(userId)

    if (User) {
      const iUserId = getters.getUserId
      const message = (User._id === iUserId)
        ? 'Welcome to mChat! Please use /help command for list of all available commands.'
        : `${User._nick} has joined the room.`

      commit('insertChannelSystemMessage', { to, message, date })
    }
  },

  insertChannelLeave ({ commit, getters }, { to, userId, date }) {
    const User = getters.findUserById(userId)

    if (User) {
      commit('insertChannelSystemMessage', {
        to,
        message: `${User._nick} has left the room.`,
        date
      })
    }
  },

  insertChannelSystem ({ commit, getters }, data) {
    commit('insertChannelSystemMessage', data)
  },

  changeChannelTopic ({ commit }, data) {
    commit('changeChannelTopic', data)
  }
}

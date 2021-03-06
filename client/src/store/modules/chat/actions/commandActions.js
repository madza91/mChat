export const commandActions = {
  callCommand ({ commit, getters }, data) {
    switch (data.command) {
      case 'nick':
        commit('renameUser', data)
        getters.getChannels.forEach(channel => {
          commit('insertChannelSystemMessage', {
            to: channel._id,
            message: `${data.oldNick} changed nick to ${data.newNick}`,
            date: data.date
          })
        })

        if (data.id === getters.getUserId) {
          commit('setNick', data.newNick)
        }

        break
      case 'status':
        commit('setUserStatus', data)

        if (data.userId === getters.getUserId) {
          commit('setStatus', data)
        }
        break
      case 'noticeme':
        commit('setUserNoticeMe', data.userId)
        break
    }
  }
}

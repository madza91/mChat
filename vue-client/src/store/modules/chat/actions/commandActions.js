export const commandActions = {
  callCommand ({ commit, getters }, data) {
    switch (data.command) {
      case 'nick':
        commit('renameUser', data)
        getters.getChannels.forEach(channel => {
          commit('insertChannelSystemMessage', {
            to: channel._title,
            message: `${data.oldNick} changed nick to ${data.newNick}`,
            date: data.date
          })
        })

        if (data.socket === getters.getUserSocketId) {
          commit('setNick', data.newNick)
        }

        break
    }
  }
}

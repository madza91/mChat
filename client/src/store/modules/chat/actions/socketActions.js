export const socketActions = {
  socket_connect ({ dispatch }) {
    dispatch('setConnected', true)
  },

  socket_disconnect ({ dispatch }) {
    dispatch('setConnected', false)
  },

  socket_error ({ dispatch }) {
    dispatch('setConnected', false)
  },

  socket_connectError ({ dispatch }) {
    dispatch('setConnected', false)
  },

  socket_connectTimeout ({ dispatch }) {
    dispatch('setConnected', false)
  },

  socket_reconnecting ({ commit }) {
    commit('setReconnecting', true)
  },

  socket_reconnect ({ dispatch }) {
    dispatch('setConnected', true)
  },

  socket_reconnectError ({ dispatch }) {
    dispatch('setConnected', false)
  },

  socket_reconnectFailed ({ dispatch }) {
    dispatch('setConnected', false)
  },

  socket_serverValidation ({ commit }, data) {
    commit('setValidation', data.message)
  },

  socket_serverWelcome ({ commit, dispatch }, data) {
    commit('setAuthenticated', data.user)
    dispatch('ui/insertHistoryUserID', data, { root: true })
  },

  socket_serverChannels ({ commit, dispatch }, channels) {
    commit('setChannels', channels)
    dispatch('setSelectedChat', {
      id: 1,
      isChannel: true
    })
  },

  socket_serverUsers ({ commit }, users) {
    commit('setUsers', users)
  },

  socket_serverJoin ({ commit }, data) {
    commit('insertUser', data)
  },

  socket_serverLeave ({ dispatch }, data) {
    dispatch('userLeave', data)
  },

  socket_channelJoin ({ dispatch }, data) {
    dispatch('insertChannelJoin', data)
  },

  socket_privateMessage ({ dispatch, commit }, data) {
    dispatch('insertUserMessage', data)
  },

  socket_privateSystem ({ dispatch, commit }, data) {
    dispatch('insertUserSystem', data)
  },

  socket_channelMessage ({ dispatch }, data) {
    dispatch('insertChannelMessage', data)
  },

  socket_channelTopic ({ dispatch }, data) {
    dispatch('changeChannelTopic', data)
  },

  socket_channelSystem ({ dispatch }, data) {
    dispatch('insertChannelSystem', data)
  },

  socket_channelLeave ({ dispatch }, data) {
    dispatch('insertChannelLeave', data)
  },

  socket_serverCommand ({ commit, dispatch }, data) {
    dispatch('callCommand', data)
  },

  socket_system ({ commit }, data) {
    commit('insertChannelMessage', {
      date: data.date,
      type: 'system',
      message: data.message
    })
  }

  // socket_image ({ commit }, data) {
  //   console.log('image received', data)
  // }
}

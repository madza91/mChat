export const socketActions = {
  SOCKET_connect ({ dispatch }) {
    dispatch('setConnected', true)
  },

  SOCKET_disconnect ({ dispatch }) {
    dispatch('setConnected', false)
  },

  SOCKET_error ({ dispatch }) {
    dispatch('setConnected', false)
  },

  SOCKET_connect_error ({ dispatch }) {
    dispatch('setConnected', false)
  },

  SOCKET_connect_timeout ({ dispatch }) {
    dispatch('setConnected', false)
  },

  SOCKET_reconnecting ({ commit }) {
    commit('setReconnecting', true)
  },

  SOCKET_reconnect ({ dispatch }) {
    dispatch('setConnected', true)
  },

  SOCKET_reconnect_error ({ dispatch }) {
    dispatch('setConnected', false)
  },

  SOCKET_reconnect_failed ({ dispatch }) {
    dispatch('setConnected', false)
  },

  SOCKET_server_validation ({ commit }, data) {
    commit('setValidation', data.message)
  },

  SOCKET_server_welcome ({ commit, dispatch }, data) {
    commit('setAuthenticated', data.user)
    dispatch('ui/insertHistoryUserID', data, { root: true })
  },

  SOCKET_server_channels ({ commit, dispatch }, channels) {
    commit('setChannels', channels)
    dispatch('setSelectedChat', {
      id: 1,
      isChannel: true
    })
  },

  SOCKET_server_users ({ commit }, users) {
    commit('setUsers', users)
  },

  SOCKET_server_join ({ commit }, data) {
    commit('insertUser', data)
  },

  SOCKET_server_leave ({ dispatch }, data) {
    dispatch('userLeave', data)
  },

  SOCKET_channel_join ({ dispatch }, data) {
    dispatch('insertChannelJoin', data)
  },

  SOCKET_private_message ({ dispatch, commit }, data) {
    dispatch('insertUserMessage', data)
  },

  SOCKET_private_system ({ dispatch, commit }, data) {
    dispatch('insertUserSystem', data)
  },

  SOCKET_channel_message ({ dispatch }, data) {
    dispatch('insertChannelMessage', data)
  },

  SOCKET_channel_system ({ dispatch }, data) {
    dispatch('insertChannelSystem', data)
  },

  SOCKET_channel_leave ({ dispatch }, data) {
    dispatch('insertChannelLeave', data)
  },

  SOCKET_server_command ({ commit, dispatch }, data) {
    dispatch('callCommand', data)
  },

  SOCKET_system ({ commit }, data) {
    commit('insertChannelMessage', {
      date: data.date,
      type: 'system',
      message: data.message
    })
  }

  // SOCKET_image ({ commit }, data) {
  //   console.log('image received', data)
  // }
}

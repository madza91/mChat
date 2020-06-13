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

  SOCKET_welcome ({ commit, dispatch }, data) {
    commit('setAuthenticated', data.user)
    dispatch('ui/insertHistoryUserID', data, { root: true })
  },

  SOCKET_channel ({ dispatch }, data) {
    dispatch('insertChannelMessage', data)
  },

  SOCKET_private ({ dispatch, commit }, data) {
    dispatch('userMessage', data)
  },

  SOCKET_channels_list ({ commit, dispatch }, channels) {
    commit('setChannels', channels)
    dispatch('setSelectedChat', {
      id: 1,
      isChannel: true
    })
  },

  SOCKET_users_list ({ commit }, users) {
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

  SOCKET_channel_leave ({ dispatch }, data) {
    dispatch('insertChannelLeave', data)
  },

  SOCKET_command ({ commit, dispatch }, data) {
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

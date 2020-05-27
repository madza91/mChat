import { myMixin } from '../../mixins/NotificationMixin'

const state = {
  nick: '',
  socketId: null,
  connected: null,
  authenticated: false,
  channels: [],
  users: [],
  selectedChat: {
    id: 'general',
    name: '#general',
    isChannel: true
  }
}

const getters = {
  getUserNick (state) {
    return state.nick
  },
  getCurrentMessages (state) {
    const { selectedChat, channels, users } = state

    if (selectedChat.isChannel) {
      const channel = channels.find(channel => channel._title === selectedChat.id)

      return channel ? channel._history : []
    }

    const user = users.find(user => user._socket === selectedChat.id)

    return user ? user._history : []
  },
  getSelectedChat (state) {
    return state.selectedChat
  },
  getUsers (state) {
    return state.users
  }
}

const actions = {
  setUserNick ({ commit }, data) {
    commit('setNick', data)
  },
  setSelectedChat ({ commit }, data) {
    commit('setSelectedChat', data)
  },
  SOCKET_connect ({ commit }, data) {
    commit('setConnected', true)
  },
  SOCKET_disconnect ({ commit }, data) {
    commit('setConnected', false)
  },
  SOCKET_error ({ commit }, data) {
    commit('setConnected', false)
  },
  SOCKET_connect_error ({ commit }, data) {
    commit('setConnected', false)
  },
  SOCKET_connect_timeout ({ commit }, data) {
    commit('setConnected', false)
  },
  SOCKET_welcome ({ commit }, data) {
    commit('setAuthenticated', data)
  },
  SOCKET_channel ({ commit }, data) {
    commit('insertChannelMessage', {
      type: data.type,
      nick: data.nick,
      text: data.message,
      socket: data.socket,
      to: data.to,
      date: new Date(data.date)
    })
  },
  SOCKET_private ({ commit }, data) {
    console.log('Private message received')
    commit('insertPrivateMessage', data)
  },
  SOCKET_channels_list ({ commit }, channels) {
    commit('setChannels', channels)
  },
  SOCKET_users_list ({ commit }, users) {
    commit('setUsers', users)
  },
  SOCKET_join ({ commit }, data) {
    commit('insertUser', data)
  },
  SOCKET_leave ({ commit }, data) {
    commit('removeUser', data)
  },
  SOCKET_command ({ commit }, data) {
    switch (data.command) {
      case 'nick':
        commit('renameUser', data)
        break
    }
  },
  SOCKET_system ({ commit }, data) {
    console.log('system', data)
    commit('insertChannelMessage', {
      date: new Date(data.date),
      type: 'system',
      text: data.message
    })
  }
}

const mutations = {
  setAuthenticated (state, data) {
    state.authenticated = true
    state.nick = data.nick
    state.socketId = data.socket
  },
  setNick (state, data) {
    state.nick = data
  },
  setSelectedChat (state, data) {
    state.selectedChat = data
    if (!data.isChannel) {
      const user = state.users.find(user => user._socket === data.id)
      user._badge = 0
    }
  },
  setConnected (state, data) {
    state.connected = data
  },
  insertChannelMessage (state, data) {
    const channel = state.channels.find(channel => channel._title === data.to)
    if (channel) {
      channel._history.push(data)
      if (data.socket && data.socket !== state.socketId) {
        myMixin.methods.sendNotification(data.text)
      }
    }
  },
  insertPrivateMessage (state, data) {
    const user = state.users.find(user => user._socket === data.socket)
    if (user) {
      user._history.push(data)
      // ToDo Move logic to the mixin
      if (state.selectedChat.id !== data.socket) {
        user._badge += 1
      }
    }
  },
  insertUser (state, data) {
    state.users.push(data)
  },
  renameUser (state, data) {
    const user = state.users.find(user => user.socket === data.socket)

    user.nick = data.newNick

    state.users = state.users.map(currentUser => {
      return [user].find(o => o.socket === currentUser.socket) || currentUser
    })

    if (data.socket === state.socketId) {
      // state.messages.push({
      //   nick: data.newNick,
      //   date: new Date(data.date),
      //   socket: data.socket,
      //   type: 'system',
      //   text: `${data.oldNick} changed nick to ${data.newNick}`
      // })
      state.nick = user.nick
    }
  },
  removeUser (state, data) {
    state.users = state.users.filter(user => user._socket !== data.socket)
  },
  setChannels (state, data) {
    state.channels = data
  },
  setUsers (state, data) {
    state.users = data
  },
  resetUsers (state) {
    state.users = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}

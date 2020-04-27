import { myMixin } from '../../mixins/NotificationMixin'

const state = {
  nick: null,
  socketId: null,
  connected: null,
  authenticated: false,
  messages: [],
  users: []
}

const getters = {
  getUserNick (state) {
    return state.nick
  },
  getMessagesByRoom: (state) => (roomName) => {
    return state.messages
  },
  getUsers (state) {
    return state.users
  }
}

const actions = {
  setUserNick ({ commit }, data) {
    commit('setNick', data)
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
  SOCKET_auth_request ({ commit }, data) {
    commit('setNotAuthenticated', data)
  },
  SOCKET_user ({ commit }, data) {
    commit('insertMessage', {
      type: 'user',
      nick: data.nick,
      text: data.message,
      socket: data.socket,
      date: new Date(data.date)
    })
  },
  SOCKET_users_list ({ commit }, data) {
    commit('setUsers', data.users)
  },
  SOCKET_history ({ commit }, data) {
    commit('setHistory', data.history)
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
  }
}

const mutations = {
  setAuthenticated (state, data) {
    state.authenticated = true
    state.nick = data.nick
    state.socketId = data.socket
  },
  setNotAuthenticated (state) {
    state.authenticated = false
  },
  setNick (state, data) {
    state.nick = data
  },
  setConnected (state, data) {
    state.connected = data
  },
  insertMessage (state, data) {
    state.messages.push(data)
    if (data.socket !== state.socketId) {
      myMixin.methods.sendNotification(data.text)
    }
  },
  resetMessages (state, data) {
    state.messages = []
  },
  insertUser (state, data) {
    state.users.push(data)
    state.messages.push({
      nick: data.nick,
      date: new Date(data.date),
      socket: data.socket,
      type: 'system',
      text: `${data.nick} has joined.`
    })
  },
  renameUser (state, data) {
    const user = state.users.find(user => user.socket === data.socket)

    user.nick = data.newNick

    state.users = state.users.map(currentUser => {
      return [user].find(o => o.socket === currentUser.socket) || currentUser
    })

    if (data.socket === state.socketId) {
      state.messages.push({
        nick: data.newNick,
        date: new Date(data.date),
        socket: data.socket,
        type: 'system',
        text: `${data.oldNick} changed nick to ${data.newNick}`
      })
      state.nick = user.nick
    }
  },
  removeUser (state, data) {
    state.users = state.users.filter(user => user.nick !== data.nick)
    state.messages.push({
      nick: data.nick,
      date: new Date(data.date),
      socket: data.socket,
      type: 'system',
      text: `${data.nick} has left.`
    })
  },
  setUsers (state, data) {
    state.users = data
  },
  setHistory (state, data) {
    state.messages = data.map((item) => {
      return {
        type: 'user',
        nick: item.nick,
        text: item.message,
        socket: item.socket,
        date: new Date(item.date)
      }
    })
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

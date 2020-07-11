import { chatMutations } from './mutations/chatMutations'
import { channelMutations } from './mutations/channelMutations'
import { userMutations } from './mutations/userMutations'
import { chatActions } from './actions/chatActions'
import { socketActions } from './actions/socketActions'
import { channelActions } from './actions/channelActions'
import { userActions } from './actions/userActions'
import { commandActions } from './actions/commandActions'
import { getters } from './getters/getters'

const state = {
  loggedInUser: {
    id: null,
    nick: null,
    status: null,
    statusMessage: null
  },
  connected: null,
  reconnecting: false,
  authenticated: false,
  validation: null,
  channels: [],
  users: [],
  selectedChat: {
    id: 1,
    isChannel: true,
    data: null
  }
}

export default {
  state,
  getters,
  actions: {
    ...chatActions,
    ...socketActions,
    ...channelActions,
    ...userActions,
    ...commandActions
  },
  mutations: {
    ...chatMutations,
    ...channelMutations,
    ...userMutations
  },
  namespaced: true
}

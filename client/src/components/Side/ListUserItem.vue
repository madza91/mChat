<template>
  <li class="clearfix list-item-user" :class="{'active': isActive}" @click="setSelected">
    <UserItem :title="name" :status="status" :dark="false" :class="{'animation-shake': shake}"/>
    <b-badge v-if="badgeNumber" pill variant="danger" class="m-auto">{{ badgeNumber }}</b-badge>
  </li>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import UserItem from '../Global/UserItem'
const { mapActions: mapUiActions } = createNamespacedHelpers('ui')
const { mapActions: mapChatActions } = createNamespacedHelpers('chat')

export default {
  name: 'ListUserItem',
  props: {
    id: {
      type: Number
    },
    name: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    },
    badge: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      default: 'online',
      required: false
    },
    shake: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      badgeLimit: 9
    }
  },
  computed: {
    badgeNumber () {
      if (this.badge > 0) {
        return (this.badge > this.badgeLimit) ? `${this.badgeLimit}+` : this.badge
      }

      return null
    }
  },
  methods: {
    ...mapUiActions(['sidebarState']),
    ...mapChatActions(['setSelectedChat']),
    setSelected () {
      this.setSelectedChat({
        id: this.id,
        isChannel: false
      })
      this.sidebarState(false)
    }
  },
  components: {
    UserItem
  }
}
</script>

<style scoped lang="scss">
  .list-item-user {
    display: flex;
    padding: 2px 15px;

    &.active {
      background-color: rgba(0,0,0,0.5);
    }

    &:hover {
      cursor: pointer;
      background-color: rgba(0,0,0,0.5);
    }
  }
</style>

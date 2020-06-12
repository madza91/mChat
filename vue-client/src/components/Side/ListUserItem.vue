<template>
  <li class="clearfix list-item-user" :class="{'active': isActive}" @click="setSelected">
    <font-awesome-icon
      v-if="isChannel"
      icon="hashtag"
      class="icon icon-channel"
    />
    <font-awesome-icon
      v-else
      icon="circle"
      class="icon icon-user"
      :class="status"
    />
    <div class="name" :class="{'animation-shake': shake}">
      <span>{{ name }}</span>
    </div>
    <b-badge v-if="badgeNumber" variant="danger">{{ badgeNumber }}</b-badge>
    <span class="close-button" @click.stop="userRemove(id)">
      <b-icon
        v-if="status === 'offline'"
        icon="x-circle-fill"
        class="m-auto offline">
      </b-icon>
    </span>
  </li>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
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
    isChannel: {
      type: Boolean,
      default: false
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
    ...mapChatActions(['setSelectedChat', 'userRemove']),
    setSelected () {
      this.setSelectedChat({
        id: this.id,
        name: this.isChannel ? `#${this.name}` : this.name, // Not needed
        isChannel: this.isChannel
      })
      this.sidebarState(false)
    }
  }
}
</script>

<style scoped>
  .list-item-user {
    display: flex;
    height: 28px;
    width: 100%;
    color: white;
    padding: 2px 10px;
  }

  .list-item-user.active {
    background: rgba(0,0,0,0.5);
  }

  .name {
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .badge {
    margin-top: 3px;
    margin-left: 5px;
  }

  .list-item-user:hover {
    cursor: pointer;
    background: rgba(0,0,0,0.5);
  }

  .list-item-user:hover .close-button {
    display: inline-block;
  }

  .close-button {
    display: none;
    padding: 0 8px;
  }

  .icon-user {
    height: 24px;
    width: 24px;
    padding: 8px;
  }

  .icon-channel {
    color: var(--color-user-status-online);
    height: 24px;
    width: 24px;
    padding: 5px;
  }

  .online {
    color: var(--color-user-status-online);
  }

  .away {
    color: var(--color-user-status-away);
  }

  .offline {
    color: var(--color-user-status-offline);
  }
</style>

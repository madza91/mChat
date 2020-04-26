<template>
  <li class="clearfix list-item-user" :class="{'active': isActive}" @click="setSelected">
    <b-icon-hash v-if="isChannel" class="icon-channel" />
    <b-icon-circle-fill v-else class="icon-user" :class="status" />
    <div class="name">
      {{ name }} <b-badge v-if="badge > 0" class="float-right" variant="danger">{{ badge }}</b-badge>
    </div>
  </li>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions: mapUiActions } = createNamespacedHelpers('ui')

export default {
  name: 'ListUserItem',
  props: {
    id: {
      type: String
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
    }
  },
  methods: {
    ...mapUiActions(['setSelectedChat', 'sidebarToggle']),
    setSelected () {
      this.setSelectedChat(this.id)
      this.sidebarToggle()
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
    width: 100%;
  }

  .badge {
    margin-top: 3px;
  }

  .list-item-user:hover {
    cursor: pointer;
    background: rgba(0,0,0,0.5);
  }

  .icon-user {
    height: 24px;
    width: 24px;
    padding: 8px;
  }

  .icon-channel {
    color: #86BB71;
    height: 24px;
    width: 24px;
    padding: 5px;
  }

  .online {
    color: #86BB71;
  }

  .away {
    color: #da9d3e;
  }
</style>

<template>
  <li class="list-item-channel" :class="{'active': isActive}" @click="setSelected">
    <ChannelItem :title="name" :dark="false"/>
  </li>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import ChannelItem from '../Global/ChannelItem'
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
    }
  },
  methods: {
    ...mapUiActions(['sidebarState']),
    ...mapChatActions(['setSelectedChat']),
    setSelected () {
      this.setSelectedChat({
        id: this.id,
        isChannel: true
      })
      this.sidebarState(false)
    }
  },
  components: {
    ChannelItem
  }
}
</script>

<style scoped lang="scss">
  .list-item-channel {
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

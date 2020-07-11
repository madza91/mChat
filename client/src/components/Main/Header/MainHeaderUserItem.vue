<template>
  <div class="wrapper">
    <UserItem :title="name" :status="status"/>
    <div class="user-status-wrapper">
      <span class="user-status-title">{{ status }}</span>
      <span class="user-status-message" v-if="statusMessage">{{ statusMessage }}</span>
    </div>
  </div>
</template>

<script>
import UserItem from '../../Global/UserItem'

export default {
  name: 'MainHeaderUserItem',
  props: {
    name: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: 'online',
      required: false
    },
    statusMessage: {
      type: String,
      default: null,
      required: false
    }
  },
  components: {
    UserItem
  }
}
</script>

<style scoped lang="scss">
  .wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 2px 10px;
  }

  .user-status-wrapper {
    font-size: 10px;
    color: darkgrey;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .user-status-title {
    font-weight: 600;
  }

  .user-status-message {
    font-style: italic;
  }

  .user-status-message::before {
    content: ' - ';
  }
</style>

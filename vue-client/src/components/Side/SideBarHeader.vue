<template>
  <div class="main-sidebar-header us-none">
    <img src="../../assets/images/default.jpg" class="user-profile-picture" alt="avatar"/>
    <div class="user-wrapper">
      <span class="user-fullname">{{ getUserNick() }}</span>
      <div class="user-status-wrapper">
        <span class="user-status-title" :class="getStatusClass">{{ getUserStatus() }}</span>
        <span class="user-status-message" v-if="getUserStatusMessage()">{{ getUserStatusMessage() }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('chat')

export default {
  name: 'SideBarHeader',
  computed: {
    getStatusClass () {
      return 'user-status-' + this.getUserStatus()
    }
  },
  methods: {
    ...mapGetters(['getUserNick', 'getUserStatus', 'getUserStatusMessage'])
  }
}
</script>

<style scoped lang="scss">
  .main-sidebar-header {
    display: flex;
    max-height: 60px;
    height: 60px;
    padding: 10px;

    @media screen and (prefers-color-scheme: dark) {
      color: white;
    }
  }

  .user-profile-picture {
    width: 40px;
    height: 40px;
    border-radius: 30px;
  }

  .user-wrapper {
    display: flex;
    flex-direction: column;
    margin: auto 0;
    font-size: 12px;
    padding-left: 10px;
    overflow: hidden;
  }

  .user-fullname {
    color: white;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .user-status-wrapper {
    color: darkgrey;
    font-size: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .user-status-message {
    color: darkgrey;
    font-style: italic;
  }

  .user-status-message::before {
    content: ' - ';
  }

  .user-status-online {
    color: var(--color-user-status-online);
  }

  .user-status-away {
    color: var(--color-user-status-away);
  }

  .user-status-offline {
    color: var(--color-user-status-offline);
  }
</style>

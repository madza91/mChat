<template>
  <div class="main-sidebar-header us-none">
    <img src="../../assets/images/default.jpg" class="user-profile-picture" alt="avatar"/>
    <div class="user-wrapper">
      <span class="user-fullname">{{ getUserNick() }}</span>
      <span class="user-status" :class="'user-status-' + getUserStatus()">{{ getUserStatus() }}</span>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('chat')

export default {
  name: 'SideBarHeader',
  methods: {
    ...mapGetters(['getUserNick', 'getUserStatus'])
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
  }

  .user-fullname {
    font-weight: bold;
  }

  .user-status {
    font-size: 10px;
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

<template>
  <div class="main-sidebar-header us-none">
      <img src="../../assets/images/default.jpg" class="user-profile-picture" alt="avatar"/>
      <span class="user-fullname">{{ getUserNick() }}</span>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('chat')

export default {
  name: 'SideBarHeader',
  methods: {
    ...mapGetters(['getUserNick'])
  }
}
</script>

<style scoped lang="scss">
  .main-sidebar-header {
    display: flex;
    background-color: var(--color-default);
    max-height: 60px;
    height: 60px;
    padding: 10px;

    @media screen and (prefers-color-scheme: dark) {
      color: white;
      background-color: var(--color-default-dark)
    }
  }

  .user-profile-picture {
    width: 40px;
    height: 40px;
    border-radius: 12px 3px;
  }

  .user-fullname {
    font-size: 12px;
    line-height: 40px;
    padding-left: 10px;
  }
</style>

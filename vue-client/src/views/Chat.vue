<template>
  <div
    class="wrapper"
    v-bind:class="{'sidebar-open': sidebar}">
    <SideBar />
    <ControlSideBar />
    <ContentWrapper />
  </div>
</template>

<script>
import SideBar from '@/components/Side/SideBar.vue'
import ControlSideBar from '@/components/Side/ControlSideBar.vue'
import ContentWrapper from '@/components/Main/ContentWrapper.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('ui')

export default {
  name: 'Chat',
  components: {
    SideBar,
    ControlSideBar,
    ContentWrapper
  },
  computed: {
    ...mapState(['sidebar'])
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    height: 100%;
    width: 100%;
    position: fixed;
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior: none;
  }
</style>

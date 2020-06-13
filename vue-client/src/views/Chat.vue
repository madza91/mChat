<template>
  <div
    class="wrapper"
    :class="{'sidebar-open': sidebar, 'blur': !authenticated}">
    <SideBar />
    <ControlSideBar />
    <ContentWrapper />
    <WelcomeModal />
    <AboutModal />
    <NoticeModal />
  </div>
</template>

<script>
import SideBar from '../components/Side/SideBar.vue'
import ControlSideBar from '../components/Side/ControlSideBar.vue'
import ContentWrapper from '../components/Main/ContentWrapper.vue'
import WelcomeModal from '../components/Modals/WelcomeModal'
import AboutModal from '../components/Modals/AboutModal'
import NoticeModal from '../components/Modals/NoticeModal'

import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('ui')
const { mapState: mapChatState } = createNamespacedHelpers('chat')

export default {
  name: 'Chat',
  components: {
    AboutModal,
    NoticeModal,
    WelcomeModal,
    SideBar,
    ControlSideBar,
    ContentWrapper
  },
  computed: {
    ...mapState(['sidebar']),
    ...mapChatState(['authenticated'])
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    height: 100%;
    width: 100%;
    position: absolute;
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior: none;
  }
</style>

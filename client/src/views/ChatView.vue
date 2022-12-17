<template>
  <div
    class="wrapper"
    :class="{'sidebar-open': sidebar, 'blur': !authenticated}">
    <SideBar />
    <ContentWrapper />
    <WelcomeModal />
    <AboutModal />
    <NoticeModal />
    <ImageModal />
  </div>
</template>

<script>
import SideBar from '../components/Side/SideBar.vue'
import ContentWrapper from '../components/Main/ContentWrapper.vue'
import WelcomeModal from '../components/Modals/WelcomeModal'

import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('ui')
const { mapState: mapChatState } = createNamespacedHelpers('chat')

export default {
  name: 'ChatView',
  components: {
    WelcomeModal,
    SideBar,
    ContentWrapper,
    AboutModal: () => import('../components/Modals/AboutModal'),
    NoticeModal: () => import('../components/Modals/NoticeModal'),
    ImageModal: () => import('../components/Modals/ImageModal')
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

    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
      overflow-x: visible;
      overflow-y: visible;
    }
  }
</style>

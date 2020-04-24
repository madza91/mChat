<template>
  <header class="main-header">
    <b-icon-list
      class="icon d-block d-sm-none"
      @click="sidebarToggle"
    />
    <div class="mb-auto mr-auto mt-auto pl-sm-3">
      #general
    </div>
    <b-icon-three-dots-vertical
      class="icon"
      @click="settingsToggle"
    />
  </header>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions: mapUiActions, mapGetters: mapUiGetters } = createNamespacedHelpers('ui')
const { mapState: mapChatState } = createNamespacedHelpers('chat')

export default {
  name: 'MainHeader',
  props: {
    msg: {
      type: String,
      default: '',
      required: false
    }
  },
  computed: {
    ...mapChatState(['messages'])
  },
  updated () {
    const messages = this.getMessagesByRoom('ads')

    console.log('messages2', messages)
  },
  methods: {
    ...mapUiActions(['sidebarToggle', 'settingsToggle']),
    ...mapUiGetters(['getSidebar'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .icon {
    width: var(--main-header-height);
    height: var(--main-header-height);
    padding: calc(var(--main-header-height) / 3);

    @media only screen and (max-width: 600px) {
      width: var(--main-header-height-mobile);
      height: var(--main-header-height-mobile);
      padding: 10px;
    }
  }

  .main-header {
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    right: 0;
    max-height: var(--main-header-height);
    height: var(--main-header-height);
    width: 100%;
    z-index: 1030;
    transition: transform .3s ease-in-out, width .3s ease-in-out;
    backdrop-filter: blur(10px);
    background-color: rgba(144, 144, 144, 0.3);
    overflow: auto;

    @media only screen and (max-width: 600px) {
      height: var(--main-header-height-mobile);
    }
  }
</style>

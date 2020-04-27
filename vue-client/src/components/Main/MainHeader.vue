<template>
  <header class="main-header">
    <b-icon-list
      class="icon d-block d-sm-none"
      @click="sidebarToggle"
    />
    <div class="mb-auto mr-auto mt-auto pl-sm-3 us-none">
      #general
    </div>
    <b-icon-exclamation-triangle-fill
      variant="warning"
      class="icon"
      v-show="connected === false"
      @click="settingsToggle"
    />
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
    ...mapChatState(['messages', 'connected'])
  },
  methods: {
    ...mapUiActions(['sidebarToggle', 'settingsToggle']),
    ...mapUiGetters(['getSidebar'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../../assets/styles';

  .icon {
    width: var(--main-header-height);
    height: var(--main-header-height);
    padding: calc(var(--main-header-height) / 3);

    @include media-breakpoint-down(xs) {
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
    transition: transform .2s ease-in-out, width .2s ease-in-out;
    background-color: var(--color-default);
    border-bottom: 1px solid var(--color-border);
    overflow: hidden;

    @media screen and (prefers-color-scheme: dark) {
      color: white;
      border-bottom: 1px solid var(--color-border-dark);
      background-color: var(--color-default-dark)
    }

    @include media-breakpoint-down(xs) {
      height: var(--main-header-height-mobile);
    }
  }
</style>

<template>
  <header class="main-header us-none" ref="header">
    <b-icon-list
      class="icon d-block d-sm-none"
      @click="sidebarToggle"
    />
    <div v-if="selectedChat.data" class="mb-auto mr-auto mt-auto">
      <MainHeaderUserItem
        v-if="!selectedChat.isChannel"
        :name="selectedChat.data._nick"
        :status="selectedChat.data._status"
      />
      <MainHeaderChannelItem
        v-if="selectedChat.isChannel"
        :title="selectedChat.data._title"
        :description="selectedChat.data._description"
      />
    </div>
    <font-awesome-icon
      v-if="reconnecting"
      icon="sync-alt"
      class="icon animation-spinning"
    />
    <b-icon-exclamation-triangle-fill
      variant="warning"
      class="icon"
      v-show="connected === false && !reconnecting"
      @click="settingsToggle"
    />
    <b-icon-info-circle-fill
      class="icon"
      @click="aboutToggle"
    />
    <b-icon-three-dots-vertical
      class="icon"
      :class="{ 'd-none': !settings.rightMenu }"
      @click="settingsToggle"
    />
  </header>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import MainHeaderChannelItem from './MainHeaderChannelItem'
import MainHeaderUserItem from './MainHeaderUserItem'
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
  mounted () {
    this.$refs.header.addEventListener('touchmove', (e) => {
      e.preventDefault()
    })
  },
  data () {
    return {
      settings: {
        rightMenu: false // Disabled feature for now
      }
    }
  },
  components: {
    MainHeaderChannelItem,
    MainHeaderUserItem
  },
  computed: {
    ...mapChatState(['connected', 'reconnecting', 'selectedChat'])
  },
  methods: {
    ...mapUiActions(['sidebarToggle', 'settingsToggle', 'aboutToggle']),
    ...mapUiGetters(['getSidebar'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../../assets/styles';

  .icon {
    cursor: pointer;
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
    display: flex;
    min-height: var(--main-header-height);
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
      min-height: var(--main-header-height-mobile);
    }
  }
</style>

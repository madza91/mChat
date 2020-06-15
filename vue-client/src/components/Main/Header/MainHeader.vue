<template>
  <header class="main-header us-none" ref="header">
    <div class="icon-wrapper d-sm-none">
      <b-icon icon="list" @click="sidebarToggle"></b-icon>
      <b-icon v-if="isUnreads" icon="circle-fill" variant="danger" class="icon-badge" />
    </div>
    <div v-if="selectedChat.data" class="main-header-content mb-auto mr-auto mt-auto pl-sm-3">
      <MainHeaderUserItem
        v-if="!selectedChat.isChannel"
        :name="selectedChat.data._nick"
        :status="selectedChat.data._status"
        :statusMessage="selectedChat.data._statusMessage"
      />
      <MainHeaderChannelItem
        v-if="selectedChat.isChannel"
        :title="selectedChat.data._title"
        :topic="selectedChat.data._topic"
      />
    </div>
    <div v-else class="mr-auto"></div>
    <div class="icon-wrapper" v-if="reconnecting">
      <b-icon icon="arrow-repeat" animation="spin"></b-icon>
    </div>
    <div class="icon-wrapper" v-if="connected === false && !reconnecting">
      <b-icon
        icon="exclamation-triangle-fill"
        variant="warning"
        @click="setNotAuthenticated">
      </b-icon>
    </div>
    <div class="icon-wrapper">
      <b-icon icon="info-circle-fill" @click="aboutToggle"></b-icon>
    </div>

    <div class="icon-wrapper" v-if="settings.rightMenu">
      <b-icon icon="three-dots-vertical" @click="settingsToggle"></b-icon>
    </div>
  </header>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import MainHeaderChannelItem from './MainHeaderChannelItem'
import MainHeaderUserItem from './MainHeaderUserItem'
const { mapActions: mapUiActions, mapGetters: mapUiGetters } = createNamespacedHelpers('ui')
const { mapState: mapChatState, mapGetters: mapChatGetters, mapMutations: mapChatMutations } = createNamespacedHelpers('chat')

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
    ...mapChatState(['connected', 'reconnecting', 'selectedChat']),
    isUnreads () {
      return this.getUnreadMessageCount() > 0
    }
  },
  methods: {
    ...mapUiActions(['sidebarToggle', 'settingsToggle', 'aboutToggle']),
    ...mapUiGetters(['getSidebar']),
    ...mapChatGetters(['getUnreadMessageCount']),
    ...mapChatMutations(['setNotAuthenticated'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../../../assets/styles';

  .icon-wrapper {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    cursor: pointer;
    width: var(--main-header-height);
    height: var(--main-header-height);

    @include media-breakpoint-down(xs) {
      width: var(--main-header-height-mobile);
      height: var(--main-header-height-mobile);
    }

    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
      width: 60px;
    }

    .icon-badge {
      font-size: 9px;
      position: absolute;
      top: 17px;
      right: 17px;

      @include media-breakpoint-down(xs) {
        top: 10px;
        right: 10px;
      }
    }
  }

  .main-header {
    display: flex;
    min-height: var(--main-header-height);
    max-height: var(--main-header-height);
    height: var(--main-header-height);
    width: 100%;
    //z-index: 1030;
    transition: transform .2s ease-in-out, width .2s ease-in-out;
    background-color: var(--color-default);
    border-bottom: 1px solid var(--color-border);
    overflow: hidden;

    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
      min-height: 60px;
      max-height: 60px;
      height: 60px;
      background-color: #F4F4F4;
      border-bottom: #DBDBDB;
    }

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

  .main-header-content {
    white-space: nowrap;
    overflow: hidden;
  }
</style>

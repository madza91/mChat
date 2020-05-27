<template>
  <aside class="main-sidebar us-none">
    <SideBarHeader />
    <div class="scrollable">
      <ListSectionItem section-name="Channels" />
      <ul class="sidebar-nav">
        <ListUserItem
          v-for="channel in channels"
          :key="channel._title"
          :id="channel._title"
          :name="channel._title"
          :is-channel="true"
          :is-active="selectedChat.id === channel._title"/>
      </ul>
      <ListSectionItem section-name="People" />
      <ul class="sidebar-nav">
        <ListUserItem
          v-for="user in users"
          :key="user._nick"
          :id="user._socket"
          :name="user._nick"
          :badge="user._badge"
          :is-active="user._socket === selectedChat.id"
        />
      </ul>
    </div>
  </aside>
</template>

<script>
import ListUserItem from './ListUserItem'
import SideBarHeader from './SideBarHeader'
import ListSectionItem from './ListSectionItem'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('chat')

export default {
  name: 'SideBar',
  computed: {
    ...mapState(['users', 'channels', 'selectedChat'])
  },
  components: {
    ListSectionItem,
    ListUserItem,
    SideBarHeader
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/styles';

  .sidebar-nav {
    list-style: none;
    padding: 0 0 10px;
    margin: 0;
  }

  .main-sidebar {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    min-height: 100%;
    width: var(--sidebar-width);
    background-color: #444753;
    z-index: 810;
    transition: transform .2s ease-in-out, width .2s ease-in-out;
  }
  @include media-breakpoint-down(xs) {
    .main-sidebar {
      -webkit-transform: translate(calc(-1 * var(--sidebar-width)), 0);
      transform: translate(calc(-1 * var(--sidebar-width)), 0);
    }
  }

  .sidebar-open .main-sidebar {
    transform: translate(0, 0);
  }

  .scrollable {
    padding: 15px 0;
    flex-grow: 1;
    overflow-y: scroll;
  }

  .info {
    color: deepskyblue;
  }

  .me {
    color: #94C2ED;
  }
</style>

<template>
  <aside class="main-sidebar us-none">
    <SideBarHeader />
    <div class="search-wrapper">
      <label>
        <input v-model="filterTerm" placeholder="Filter channels and users" />
      </label>
    </div>
    <div class="scrollable">
      <ListSectionItem section-name="Channels" />
      <ul class="sidebar-nav">
        <ListChannelItem
          v-for="channel in filteredChannels"
          :key="channel._id"
          :id="channel._id"
          :name="channel._title"
          :is-active="selectedChat.data._id === channel._id && selectedChat.isChannel"/>
      </ul>
      <ListSectionItem section-name="People" />
      <ul class="sidebar-nav">
        <ListUserItem
          v-for="user in filteredUsers"
          :key="user._id"
          :id="user._id"
          :name="user._nick"
          :badge="user._badge"
          :status="user._status"
          :shake="user._noticeMe"
          :is-active="user._id === selectedChat.data._id && !selectedChat.isChannel"
        />
      </ul>
    </div>
  </aside>
</template>

<script>
import ListChannelItem from './ListChannelItem'
import ListUserItem from './ListUserItem'
import SideBarHeader from './SideBarHeader'
import ListSectionItem from './ListSectionItem'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('chat')

export default {
  name: 'SideBar',
  computed: {
    ...mapState(['users', 'channels', 'selectedChat']),
    filteredChannels () {
      return this.channels && this.channels.filter(channel => channel._title.toLowerCase().includes(this.filterTerm.toLowerCase()))
    },
    filteredUsers () {
      return this.users && this.users.filter(user => user._nick.toLowerCase().includes(this.filterTerm.toLowerCase()))
    }
  },
  data () {
    return {
      filterTerm: ''
    }
  },
  components: {
    ListSectionItem,
    ListChannelItem,
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
    //z-index: 810;
    transition: transform .2s ease-in-out, width .2s ease-in-out;

    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
      width: 250px;
    }
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

  .search-wrapper {
    text-align: center;
    padding: 10px;
  }

  .search-wrapper input {
    width: 90%;
    font-size: 12px;
    border: 1px solid black;
    border-radius: 20px;
    background-color: #444753;
    padding: 4px 10px;
    color: white;
    text-align: center;
  }

  .search-wrapper input::placeholder {
    font-size: 10px;
    text-align: center;
  }

  .scrollable {
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

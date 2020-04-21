<template>
  <aside class="main-sidebar">
    <SideBarHeader />
    <div class="scrollable">
      <ul class="sidebar-nav">
        <ListUserItem v-for="user in users" :key="user.nick" :nick="user.nick"/>
      </ul>
    </div>
  </aside>
</template>

<script>
import ListUserItem from './ListUserItem'
import SideBarHeader from './SideBarHeader'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('chat')

export default {
  name: 'SideBar',
  computed: {
    ...mapState(['users'])
  },
  components: {
    ListUserItem,
    SideBarHeader
  },
  methods: {
    ...mapActions([
      'addUser',
      'setUsers',
      'removeUser'
    ])
  },
  sockets: {
    users_list: function (data) {
      this.setUsers(data.users)
    },
    join: function (data) {
      this.addUser(data)
    },
    leave: function (data) {
      this.removeUser(data.nick)
    }
  }
}
</script>

<style scoped>
  .sidebar-nav {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .main-sidebar {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100%;
    width: var(--sidebar-width);
    background-color: #444753;
    z-index: 810;
    transition: transform .3s ease-in-out, width .3s ease-in-out;
  }
  @media only screen and (max-width: 600px) {
    .main-sidebar {
      -webkit-transform: translate(-230px, 0);
      transform: translate(-230px, 0);
    }
  }
  .sidebar-open .main-sidebar {
    transform: translate(0, 0);
  }
  .scrollable {
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    overflow: scroll;
  }

  .info {
    color: deepskyblue;
  }

  .me {
    color: #94C2ED;
  }
</style>

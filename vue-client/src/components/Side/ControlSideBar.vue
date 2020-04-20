<template>
  <aside
    class="control-sidebar"
    :class="{'control-sidebar-open': settingsBar}">
    <ul class="sidebar-nav">
      <li class="sidebar-brand">
        <a href="#">
          Settings
        </a>
      </li>
    </ul>
  </aside>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('ui')

export default {
  name: 'ControlSideBar',
  computed: {
    ...mapState(['settingsBar'])
  }
}
</script>

<style scoped>
  .control-sidebar {
    position: absolute;
    height: 100%;
    top: 0;
    right: calc(-1 * var(--sidebar-width));
    width: var(--sidebar-width);
    transition: right .3s ease-in-out;
    color: white;
    background-color: #222d32;
    z-index: 1050;
  }

  .control-sidebar.control-sidebar-open {
    right: 0;
  }
</style>

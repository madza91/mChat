<template>
  <aside
    class="control-sidebar"
    :class="{'control-sidebar-open': settingsBar}"
    @click="settingsToggle"
  >
    <ul class="sidebar-nav">
      <li class="sidebar-brand">
        <a href="#">
          Click anywhere to close (WIP)
        </a>
        <p class="build-number">Build: {{ getBuildDate }}</p>
      </li>
    </ul>
  </aside>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import moment from 'moment'
const { mapState, mapActions } = createNamespacedHelpers('ui')

export default {
  name: 'ControlSideBar',
  computed: {
    ...mapState(['settingsBar']),
    getBuildDate () {
      // ToDo Remove this, it's for debugging only
      return moment(document.documentElement.dataset.buildTimestampUtc).format('D.MM.Y H:mm:ss')
    }
  },
  methods: {
    ...mapActions(['settingsToggle'])
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
    transition: right .2s ease-in-out;
    color: white;
    background-color: #222d32;
    z-index: 1050;
  }

  .control-sidebar.control-sidebar-open {
    right: 0;
  }

  .build-number {
    position: absolute;
    bottom: 10px;
    font-size: 12px;
    width: 100%;
    text-align: center;
  }
</style>

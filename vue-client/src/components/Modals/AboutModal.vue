<template>
  <div>
    <b-modal
      id="modal-center"
      title="BootstrapVue"
      centered
      no-close-on-esc
      no-close-on-backdrop
      hide-header
      hide-footer
      no-fade
      :visible="aboutModal"
    >
      <div class="d-block us-none">
        <h2 class="mb-3 text-center">About</h2>
        <p class="mb-4">
          This is a tiny chat app that is using web sockets, nodeJs and it will have some interesting content. WIP :)
        </p>
        <p class="build-number">Build: {{ getBuildDate }}</p>

        <b-form-group class="text-center">
          <b-button @click="aboutToggle" variant="outline-primary">Close</b-button>
        </b-form-group>
      </div>
    </b-modal>
  </div>
</template>

<script>
import moment from 'moment'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('ui')

export default {
  name: 'AboutModal',
  computed: {
    ...mapState(['aboutModal']),
    getBuildDate () {
      // ToDo Remove this, it's for debugging only
      return moment(document.documentElement.dataset.buildTimestampUtc).format('D.MM.Y H:mm:ss')
    }
  },
  methods: {
    ...mapActions(['aboutToggle'])
  }
}
</script>

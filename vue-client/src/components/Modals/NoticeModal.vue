<template>
  <div>
    <b-modal
      id="notice-modal"
      centered
      no-close-on-esc
      no-close-on-backdrop
      hide-header
      hide-footer
      no-fade
      :visible="noticeModal"
    >
      <div class="d-block us-none">
        <h2 class="mb-3 text-center">Notice</h2>
        <p class="mb-4 text-center">
          This option is still under development.
        </p>

        <b-form-group class="text-center">
          <b-button @click="noticeToggle" variant="outline-primary">Close</b-button>
        </b-form-group>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('ui')

export default {
  name: 'NoticeModal',
  computed: {
    ...mapState(['noticeModal'])
  },
  methods: {
    ...mapActions(['noticeToggle'])
  }
}
</script>

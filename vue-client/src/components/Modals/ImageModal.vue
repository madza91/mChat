<template>
  <div>
    <b-modal
      id="image-modal"
      centered
      hide-header
      hide-footer
      no-fade
      :visible="imageModal && true"
    >
      <div v-if="imageModal" class="d-block us-none">
        <img :src="imageModal" alt="attachment"/>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('ui')

export default {
  name: 'ImageModal',
  computed: {
    ...mapState(['imageModal'])
  },
  mounted () {
    this.$root.$on('bv::modal::hide', (bvEvent) => {
      if (bvEvent.trigger) {
        this.imageToggle()
      }
    })
  },
  methods: {
    ...mapActions(['imageToggle'])
  }
}
</script>

<style lang="scss">
  #image-modal {
    .modal-body {
      padding: 0;
    }

    .modal-content {
      width: unset;
      background-color: unset;
      border: unset;
    }

    .modal-dialog-centered {
      justify-content: center;
    }

    img {
      max-width: 100%;
      max-height: 80vh;
    }
  }
</style>

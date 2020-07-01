<template>
  <div>
    <b-modal
      id="image-modal"
      centered
      hide-header
      hide-footer
      :visible="imageModal && true"
    >
      <div v-if="imageModal" class="d-block us-none">
        <b-spinner v-if="!isLoaded" variant="success" label="Spinning"></b-spinner>
        <img v-show="isLoaded" :src="imageModal" @load="handleLoad" alt="attachment"/>
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
  data () {
    return {
      isLoaded: false
    }
  },
  mounted () {
    this.$root.$on('bv::modal::hide', (bvEvent) => {
      if (bvEvent.trigger) {
        this.imageToggle()
        this.isLoaded = false
      }
    })
  },
  methods: {
    ...mapActions(['imageToggle']),
    handleLoad () {
      this.isLoaded = true
    }
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

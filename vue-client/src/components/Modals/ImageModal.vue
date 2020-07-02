<template>
  <div>
    <b-modal
      id="image-modal"
      centered
      hide-header-close
      hide-footer
      :visible="imageModal && true"
    >
      <template v-if="isLoaded" v-slot:modal-header="{ close }">
        <b-icon icon="x-circle-fill" @click="close()"></b-icon>
      </template>
      <div v-if="imageModal" class="d-block us-none">
        <b-spinner v-if="!isLoaded" variant="success" label="Spinning"></b-spinner>
        <div v-if="error" class="modal-error">
          {{ error }}
        </div>
        <img v-show="isLoaded && !error" :src="imageModal" @load="handleLoad" @error="handleLoadT" alt="attachment"/>
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
      isLoaded: false,
      error: null
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
      this.error = null
    },
    handleLoadT () {
      this.isLoaded = true
      this.error = 'Image can not be loaded'
    }
  }
}
</script>

<style lang="scss">
  #image-modal {
    .modal-header {
      position: absolute;
      z-index: 1;
      border-bottom: unset;
      right: 0;
      top: 0;
    }

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

    .modal-error {
      display: flex;
      min-height: 100px;
      min-width: 300px;
      background-color: white;
      align-items: center;
      justify-content: center;
    }

    .b-icon {
      color: #bbb;
      cursor: pointer;
      font-size: 25px;
      opacity: 0.5;
    }

    img {
      max-width: 100%;
      max-height: 80vh;
    }
  }
</style>

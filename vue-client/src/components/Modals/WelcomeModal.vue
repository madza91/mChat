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
      :visible="!authenticated"
    >
      <div class="d-block us-none">
        <h2 class="mb-3 text-center">Welcome!</h2>
        <p class="mb-4">
          This is a tiny chat app that is using web sockets, nodeJs and it will have some interesting content. WIP :)
        </p>

        <b-form-group
          id="fieldset-1"
          class="nickname-input"
          label="Enter your nickname"
          label-for="input-1"
          :invalid-feedback="invalidFeedback"
          :valid-feedback="validFeedback"
          :state="state"
        >
          <b-form-input v-on:keyup.enter="connect" id="input-1" v-model="nickname" :state="state" trim autofocus></b-form-input>
        </b-form-group>

        <b-form-group class="text-center">
          <b-button @click="connect" variant="outline-success">Get in</b-button>
        </b-form-group>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters } = createNamespacedHelpers('chat')

export default {
  name: 'WelcomeModal',
  computed: {
    ...mapState(['authenticated']),
    ...mapGetters(['getUserNick']),
    state () {
      return /^[0-9A-Za-z.-/-_!@#$%^&*()|<>?{}'"/[\]]{3,30}$/.test(this.nickname)
    },
    invalidFeedback () {
      if (this.nickname.length > 0) {
        return 'Enter at least 3 characters and do not use spaces'
      } else {
        return ''
      }
    },
    validFeedback () {
      return this.state === true ? 'You are ready!' : ''
    }
  },
  mounted () {
    this.nickname = this.getUserNick
  },
  data () {
    return {
      nickname: ''
    }
  },
  methods: {
    connect () {
      this.$socket.io.opts.query = `nick=${this.nickname}`
      this.$socket.open()
    }
  }
}
</script>

<style>
  #fieldset-1 {
    min-height: 100px;
  }
  .modal-content {
    border-radius: 1rem;
  }
</style>

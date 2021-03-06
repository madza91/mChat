<template>
  <div>
    <b-modal
      id="welcome-modal"
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
        <b-row>
          <b-col cols="10" class="m-auto">
            <p class="text-center mb-4 description">
              This is a tiny chat app that is using web sockets, nodeJs and it will have some interesting content. Enjoy! 🙃
            </p>

            <b-form-group label="Enter your nickname">
              <b-form-input
                :state="isValid()"
                v-model="nickname"
                v-on:keyup.enter="connect"
                maxlength="30"
                trim
                autofocus>
              </b-form-input>
              <div class="validation">{{ getValidationMessage }}</div>
            </b-form-group>

            <b-form-group class="text-center">
              <b-button block @click="connect" variant="success" :disabled="!isValid() || getValidationMessage || loading">
                <b-spinner v-if="loading" class="mr-2" small></b-spinner>
                <span v-if="loading">Getting in...</span>
                <span v-else>Get in</span>
              </b-button>
            </b-form-group>
          </b-col>
        </b-row>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import notificationMixin from '../../mixins/NotificationMixin'
const { mapState, mapGetters: mapChatGetters, mapActions: mapChatActions } = createNamespacedHelpers('chat')
const { mapActions: mapUiActions, mapGetters: mapUiGetters } = createNamespacedHelpers('ui')

export default {
  name: 'WelcomeModal',
  mixins: [notificationMixin],
  computed: {
    ...mapState(['authenticated']),
    getValidationMessage () {
      return this.getValidation() || this.validationMessage
    }
  },
  mounted () {
    this.nickname = this.getChosenNick()
  },
  data () {
    return {
      nickname: '',
      validationMessage: null,
      loading: false
    }
  },
  watch: {
    nickname: function (value) {
      this.resetValidation()
      if (value.length < 3) {
        this.validationMessage = 'Enter at least 3 characters and do not use spaces'
      } else if (value.length > 30) {
        this.validationMessage = 'You reached maximum nickname length'
      } else if (!this.isValid()) {
        this.validationMessage = 'Invalid nickname. Please use only letters and numbers'
      } else {
        this.validationMessage = ''
      }
    },
    authenticated: function (value) {
      if (value === false) {
        this.loading = false
      } else {
        notificationMixin.methods.requestPermission()
      }
    },
    getValidationMessage: function (value) {
      if (value) {
        this.loading = false
      }
    }
  },
  methods: {
    ...mapUiActions(['setChosenNick']),
    ...mapUiGetters(['getChosenNick']),
    ...mapChatActions(['resetValidation']),
    ...mapChatGetters(['getValidation']),
    connect () {
      this.loading = true
      this.setChosenNick(this.nickname)
      this.$socket.client.io.opts.query = `nick=${this.nickname}`
      this.$socket.client.open()
    },
    isValid () {
      return /^[0-9A-Za-z.-/-_!@#$%^&*()|<>?{}'"/[\]]{3,30}$/.test(this.nickname)
    }
  }
}
</script>

<style scoped>
  .description {
    font-size: 12px;
  }

  .validation {
    margin-top: 5px;
    font-size: 12px;
    color: var(--red);
    min-height: 40px;
  }
</style>

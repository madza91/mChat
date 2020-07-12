<template>
  <div>
    <b-modal
      id="about-modal"
      centered
      no-close-on-esc
      no-close-on-backdrop
      hide-header
      hide-footer
      no-fade
      :visible="authenticated && aboutModal"
    >
      <div class="d-block us-none">
        <h2 class="mb-3 text-center">About</h2>
        <b-form-textarea
          id="textarea"
          v-model="text"
          rows="3"
          max-rows="6"
          readonly
        ></b-form-textarea>
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
const { mapState: mapChatState } = createNamespacedHelpers('chat')
const { mapState, mapActions } = createNamespacedHelpers('ui')

export default {
  name: 'AboutModal',
  computed: {
    ...mapChatState(['authenticated']),
    ...mapState(['aboutModal']),
    getBuildDate () {
      // ToDo Remove this, it's for debugging only
      return moment(document.documentElement.dataset.buildTimestampUtc).format('D.MM.Y H:mm:ss')
    }
  },
  data () {
    return {
      text: 'Hi! My name is Nemanja M. and this is my portfolio project.\n' +
        'This is a tiny chat app that is using web sockets, nodeJs and VueJS.\n' +
        'The main purpose of this project is to show best coding practices, coding standards, design patterns, handling sockets, using vuex, and other.\n' +
        'This app also includes libraries developed by the following third parties:\n' +
        '* vuex\n' +
        '* vuex-persist\n' +
        '* socket.io\n' +
        '* express\n' +
        '* bootstrap\n' +
        '* bootstrap-vue\n' +
        '* fontawesome\n' +
        '* moment'
    }
  },
  methods: {
    ...mapActions(['aboutToggle'])
  }
}
</script>

<style scoped>
  #textarea {
    background-color: white;
    font-size: 14px;
  }
  .build-number {
    margin-top: 5px;
    font-size: 12px;
    text-align: right;
    color: silver;
  }
</style>

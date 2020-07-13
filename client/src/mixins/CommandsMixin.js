import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('chat')

export default {
  methods: {
    ...mapGetters(['getSettingsCommands']),
    getCommands (value) {
      const command = value.substr(1).split(' ')[0]
      const allCommands = this.getSettingsCommands()

      return allCommands.filter((item) => {
        return item.command.includes(command)
      })
    }
  }
}

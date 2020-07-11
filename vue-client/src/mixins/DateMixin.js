import moment from 'moment'

export default {
  methods: {
    getFormattedDate (date) {
      const dayDifference = moment().diff(date, 'days')

      switch (dayDifference) {
        case 0:
          return 'Today'
        case 1:
          return 'Yesterday'
        default:
          return moment(date).format('DD.MM.YYYY')
      }
    }
  }
}

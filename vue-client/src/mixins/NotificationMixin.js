// define a mixin object
export const notificationMixin = {
  methods: {
    changeTitle (number) {
      const title = process.env.VUE_APP_TITLE
      document.title = number > 0 ? `(${number}) ${title}` : title
    },
    playSound () {
      const audio = new Audio('./audio/new_message.mp3')
      audio.play()
    },
    sendNotification (message, totalNew) {
      this.playSound()
      // this.changeTitle(totalNew)

      // eslint-disable-next-line no-constant-condition
      if (window.Notification) {
        if (!Notification || (!document.hidden && process.env.NODE_ENV === 'production')) {
          return
        }

        if (Notification.permission !== 'granted') {
          Notification.requestPermission()
        } else {
          const title = process.env.VUE_APP_TITLE
          // var icon = 'http://madza.rs/templates/portfolio/img/logo.png'
          const notification = new Notification(title, {
            body: message
          })

          notification.addEventListener('click', function (e) {
            parent.focus()
            window.focus()
            e.target.close()
          }, false)

          document.addEventListener('visibilitychange', function () {
            if (document.visibilityState === 'visible') {
              // The tab has become visible so clear the now-stale Notification.
              notification.close()
            }
          })
        }
      }
    }
  }
}

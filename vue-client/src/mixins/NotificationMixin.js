// define a mixin object
import store from '../store/index'
export const notificationMixin = {
  methods: {
    playSound () {
      const audio = new Audio('./audio/new_message.mp3')
      audio.play()
    },
    sendNotification (message, selectedWindowData) {
      this.playSound()

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
            body: message,
            icon: '/img/icons/android-chrome-192x192.png',
            data: {
              window: selectedWindowData
            }
          })

          notification.addEventListener('click', function (e) {
            const data = e.currentTarget.data

            if (data.window) {
              store.dispatch('chat/setSelectedChat', data.window)
            }

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

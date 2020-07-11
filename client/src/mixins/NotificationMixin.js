// define a mixin object
import store from '../store/index'
export default {
  methods: {
    playSound () {
      const audio = new Audio('./audio/new_message.mp3')
      audio.play()
    },
    requestPermission () {
      const Notification = window.Notification || window.webkitNotification

      return Notification ? Notification.requestPermission() : null
    },
    sendNotification (title, message, selectedWindowData) {
      this.playSound()
      const Notification = window.Notification || window.webkitNotification

      // eslint-disable-next-line no-constant-condition
      if (
        !Notification ||
        Notification.permission !== 'granted' ||
        (!document.hidden && process.env.NODE_ENV === 'production')
      ) {
        return
      }

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

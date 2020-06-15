<template>
  <div class="user-name-wrapper">
    <font-awesome-icon
      :icon="getIcon"
      class="icon user-icon"
      :class="getClass"
    />
    <div class="user-name" :class="{'user-name-dark': dark}">
      <span>{{ title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserItem',
  props: {
    title: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: 'online'
    },
    dark: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    getIcon () {
      return this.status === 'bot' ? 'robot' : 'circle'
    },
    getClass () {
      return `user-status-${this.status}`
    }
  }
}
</script>

<style scoped lang="scss">
  .user-name-wrapper {
    display: flex;
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .user-icon {
    margin: auto;
    font-size: 10px;
  }

  .user-name {
    color: white;
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 4px;

    @media screen and (prefers-color-scheme: dark) {
      color: white;
    }
  }

  .user-name-dark {
    color: black;

    @media screen and (prefers-color-scheme: dark) {
      color: white;
    }
  }

  .user-status-online {
    color: var(--color-user-status-online);
    margin-left: 1px;
    margin-right: 1px;
  }

  .user-status-bot {
    color: var(--color-user-status-online);
  }

  .user-status-away {
    color: var(--color-user-status-away);
  }

  .user-status-offline {
    color: var(--color-user-status-offline);
  }
</style>

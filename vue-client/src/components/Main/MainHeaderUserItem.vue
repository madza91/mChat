<template>
  <div class="wrapper">
    <div class="user-name-wrapper">
      <font-awesome-icon
        icon="circle"
        class="icon user-icon"
        :class="'user-status-' + status"
      />
      <div class="user-name">
        <span>{{ name }}</span>
      </div>
    </div>
    <div class="user-status">{{ status }}</div>
  </div>
</template>

<script>
export default {
  name: 'MainHeaderUserItem',
  props: {
    name: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: 'online',
      required: false
    }
  }
}
</script>

<style scoped lang="scss">
  .wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 2px 10px;
  }

  .user-name-wrapper {
    display: flex;
  }

  .user-icon {
    margin: auto;
    font-size: 10px;
  }

  .user-status-online {
    color: var(--color-user-status-online);
  }

  .user-status-away {
    color: var(--color-user-status-away);
  }

  .user-name {
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 3px;

    @media screen and (prefers-color-scheme: dark) {
      color: white;
      background-color: var(--color-default-dark)
    }
  }

  .user-status {
    font-size: 10px;
    color: darkgrey;
  }
</style>

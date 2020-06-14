<template>
  <div class="channel-title-wrapper">
    <font-awesome-icon
      icon="hashtag"
      class="icon channel-icon"
    />
    <div class="channel-title" :class="{'channel-title-dark': dark}">
      <span>{{ title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChannelItem',
  props: {
    title: {
      type: String,
      required: true
    },
    dark: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped lang="scss">
  .channel-title-wrapper {
    display: flex;
  }

  .channel-icon {
    color: var(--color-user-status-online);
    margin: auto;
  }

  .channel-title {
    color: white;
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 3px;
  }

  .channel-title-dark {
    color: black;

    @media screen and (prefers-color-scheme: dark) {
      color: white;
    }
  }
</style>

<template>
  <div class="wrapper">
    <div class="channel-title-wrapper">
      <font-awesome-icon
        icon="hashtag"
        class="icon channel-icon"
      />
      <div class="channel-title">
        <span>{{ title }}</span>
      </div>
    </div>
    <div class="channel-description">{{ description }}</div>
  </div>
</template>

<script>
export default {
  name: 'MainHeaderChannelItem',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
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

  .channel-title-wrapper {
    display: flex;
  }

  .channel-icon {
    color: #86BB71;
    margin: auto;
  }

  .channel-title {
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

  .channel-description {
    font-size: 10px;
    color: darkgrey;
  }
</style>

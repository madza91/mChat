<template>
  <div class="wrapper">
    <ChannelItem :title="title"/>
    <div class="channel-description">{{ description }}</div>
  </div>
</template>

<script>
import ChannelItem from '../../Global/ChannelItem'

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
  },
  components: {
    ChannelItem
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

  .channel-description {
    font-size: 10px;
    color: darkgrey;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

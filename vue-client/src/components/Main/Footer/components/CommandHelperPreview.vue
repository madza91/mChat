<template>
  <b-row class="d-flex pb-2" style="flex-flow:nowrap">
    <FooterIcon icon="times" invisible />
    <div class="content-wrapper mr-2">
      <span v-for="(item, index) in searchEmojis('')" :key="index">
        {{ item.emoji }}
      </span>
    </div>
    <FooterIcon icon="times" v-touch:start="() => $emit('close')" />
  </b-row>
</template>

<script>
import FooterIcon from './FooterIcon'
import EmojiMixin from '../../../../mixins/EmojiMixin'

export default {
  name: 'CommandHelperPreview',
  mixins: [EmojiMixin],
  components: {
    FooterIcon
  }
}
</script>

<style scoped lang="scss">
  .content-wrapper {
    display: flex;
    flex-grow: 1;
    overflow: auto;
    white-space: nowrap;

    span {
      cursor: pointer;
      margin: auto 10px;
      font-size: 12px;
    }
  }

  .content-wrapper::-webkit-scrollbar {
    display: none;
  }
</style>

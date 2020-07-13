<template>
  <b-row class="d-flex pb-2" style="flex-flow:nowrap">
    <FooterIcon icon="times" invisible />
    <div class="content-wrapper mr-2">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="command"
      >
        <span>/{{ item.command }}</span>
        <span class="command-param" v-if="description">{{ item.params }}</span>
      </div>
      <span class="description">
        {{ description }}
      </span>
    </div>
    <FooterIcon icon="times" v-touch:start="() => $emit('close')" />
  </b-row>
</template>

<script>
import FooterIcon from './FooterIcon'

export default {
  name: 'CommandHelperPreview',
  props: {
    data: {
      type: Array,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },
  computed: {
    description () {
      return this.data.length === 1 ? this.data[0].description : ''
    }
  },
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

    .command {
      margin: auto 5px;
      font-size: 12px;
      padding: 5px 15px;
      border-radius: 10px;
      border: 1px solid var(--color-border);

      @media screen and (prefers-color-scheme: dark) {
        color: white;
        background-color: var(--color-sidebar-background-dark);
        border: 1px solid var(--color-border-dark);
      }

      .command-param:before {
        content: ' '
      }
    }

    .description {
      margin: auto 20px;
      font-size: 12px;
      opacity: 0.8;
    }
  }

  .content-wrapper::-webkit-scrollbar {
    display: none;
  }
</style>

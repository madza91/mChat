<template>
  <b-row class="d-flex pb-2">
    <div class="content-wrapper mr-2">
      <img
        v-for="image in data"
        :key="image.id"
        :src="image.images.fixed_height_small.url"
        alt="gif image"
        @click="emitGif(image.images.fixed_height_small)"
      />
    </div>
    <FooterIcon icon="times" v-touch:start="() => $emit('close')" />
  </b-row>
</template>

<script>
import FooterIcon from './FooterIcon'

export default {
  name: 'GifPreview',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  components: {
    FooterIcon
  },
  methods: {
    emitGif (image) {
      this.$emit('send', {
        thumbnail: {
          dimensions: {
            w: image.width,
            h: image.height
          },
          url: image.url
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .content-wrapper {
    display: flex;
    flex-grow: 1;

    img {
      height: 50px;
      padding: 5px;
    }
  }
</style>

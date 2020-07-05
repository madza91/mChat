<template>
  <b-row class="pb-2 d-flex flex-nowrap">
    <FooterIcon icon="times" invisible />
    <div class="content-wrapper ml-2 mr-2">
      <b-img
        v-if="imagePreview"
        :src="imagePreview"
        class="image rounded"
        :class="{'transparency': !uploaded}"
        alt="Attachment image"
      />
      <span v-if="error">{{ error }}</span>
      <b-progress
        v-if="uploadProgress"
        :value="uploadProgress"
        variant="success"
        :max="100" animated
      />
    </div>
    <FooterIcon icon="times" v-touch:start="() => $emit('close')" />
  </b-row>
</template>

<script>
import FooterIcon from './FooterIcon'

export default {
  name: 'AttachmentPreview',
  props: {
    imagePreview: {
      type: String
    },
    uploadProgress: {
      type: Number,
      default: 0
    },
    uploaded: {
      type: Boolean
    },
    error: {
      type: String
    }
  },
  components: {
    FooterIcon
  }
}
</script>

<style scoped lang="scss">
  .attachment-wrapper {
    position: relative;
    cursor: pointer;
  }

  .content-wrapper {
    display: flex;
    flex-grow: 1;
    flex-direction: row;
    margin-top: auto;
    margin-bottom: auto;

    span {
      margin: auto 20px;
      font-size: 12px;
    }
  }

  .image {
    max-height: 50px;
  }

  .transparency {
    opacity: 0.6;
  }

  .progress {
    flex-grow: 1;
    margin: auto auto auto 20px;
    max-width: 200px;
  }
</style>

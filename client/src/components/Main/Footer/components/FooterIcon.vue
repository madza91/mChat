<template>
  <font-awesome-icon
    :icon="icon"
    class="icon"
    :class="{'invisible': invisible, 'disabled': disabled}"
    @click="() => $emit('click')"
  />
</template>

<script>
export default {
  name: 'FooterIcon',
  props: {
    icon: {
      type: String,
      required: true
    },
    invisible: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../../../../assets/styles';
  $padding: 10px;
  $icon-size: 25px;
  $icon-size-mobile: 20px;

  .icon {
    margin: auto;
    height: $icon-size;
    padding: 8px;
    cursor: pointer;

    @include media-breakpoint-down(xs) {
      width: $icon-size-mobile;
      height: $icon-size-mobile;
      padding: 4px;
    }
  }

  .icon.disabled {
    color: grey;
    cursor: auto;
  }
</style>

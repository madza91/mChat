<template functional>
    <div class="connection_info">There is no server connection. Please, try again later.</div>
</template>

<script>
export default {
  name: 'MainHeaderInfo'
}
</script>

<style scoped lang="scss">
.connection_info {
  text-align: center;
  position: absolute;
  z-index: 1031;
  background-color: indianred;
  width: 100%;
  top: var(--main-header-height);

  @include media-breakpoint-down(xs) {
    top: var(--main-header-height-mobile);
  }
}
</style>

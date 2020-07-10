<template>
  <div class="down-button animation-fadein" @click="() => $emit('click')">
    <font-awesome-icon icon="angle-down" />
  </div>
</template>

<script>
export default {
  name: 'ScrollDownButton'
}
</script>

<style scoped lang="scss">
.down-button {
  display: flex;
  position: sticky;
  float: right;
  bottom: 20px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  color: var(--color-border-dark);
  background-color: var(--color-message-left);
  -webkit-box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.3);

  @media screen and (prefers-color-scheme: dark) {
    color: white;
    background-color: var(--color-message-left-dark);
  }
}
</style>

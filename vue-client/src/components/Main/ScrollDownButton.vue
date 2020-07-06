<template>
  <div class="down-button animation-fadein" @click="() => $emit('click')">
    <font-awesome-icon
      icon="angle-down"
    />
  </div>
</template>

<script>
export default {
  name: 'ScrollDownButton'
}
</script>

<style scoped>
  .down-button {
    display: flex;
    position: absolute;
    bottom: 80px;
    right: 30px;
    justify-content: center;
    align-items: center;
    background-color: #525054;
    color: white;
    cursor: pointer;
    width: 40px;
    height: 40px;
    margin: auto;
    border-radius: 20px;

    -webkit-box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.3);
    box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.3);
  }
</style>

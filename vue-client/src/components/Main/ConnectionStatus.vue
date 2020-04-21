<template>
    <div class="connection_info">There is no server connection. Please, try again later.</div>
</template>

<script>
export default {
  name: 'ConnectionStatus'
}
</script>

<style scoped>
.connection_info {
  text-align: center;
  position: absolute;
  z-index: 1031;
  background-color: indianred;
  width: 100%;
  top: 60px;
}
</style>

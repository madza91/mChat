<template>
  <li class="clearfix list-item-user">
    <b-icon-hash class="icon" />
    <div class="name">{{ channel }}</div>
  </li>
</template>

<script>
export default {
  name: 'ListChannelItem',
  props: {
    channel: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
  .list-item-user {
    display: flex;
    height: 28px;
    width: 100%;
    color: white;
    padding: 2px 10px;
  }

  .icon {
    color: #86BB71;
    height: 24px;
    width: 24px;
    padding: 5px;
  }
</style>

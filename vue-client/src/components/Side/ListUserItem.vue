<template>
  <li class="clearfix list-item-user">
    <b-icon-circle-fill class="icon online" />
    <div class="name">{{ nick }}</div>
  </li>
</template>

<script>
export default {
  name: 'ListUserItem',
  props: {
    nick: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: 'online',
      required: false
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
    height: 24px;
    width: 24px;
    padding: 8px;
  }

  .online {
    color: #86BB71;
  }

  .away {
    color: #da9d3e;
  }
</style>

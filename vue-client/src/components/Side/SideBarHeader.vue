<template>
  <div class="main-sidebar-header">
      <img src="./../../assets/default.jpg" class="user-profile-picture" alt="avatar"/>
      <span class="user-fullname">{{ userNick }}</span>
  </div>
</template>

<script>
export default {
  name: 'SideBarHeader',
  data: function () {
    return {
      userNick: 'Full Name'
    }
  }
}
</script>

<style scoped>
  .main-sidebar-header {
    display: flex;
    color: white;
    background-color: #444753;
    max-height: 60px;
    height: 60px;
    padding: 10px;
  }

  .user-profile-picture {
    width: 40px;
    height: 40px;
    border-radius: 12px 3px;
  }

  .user-fullname {
    font-size: 12px;
    line-height: 40px;
    padding-left: 10px;
  }
</style>

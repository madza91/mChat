<template>
    <div class="section-name">
      {{ sectionName }}
    </div>
</template>

<script>
export default {
  name: 'ListSectionItem',
  props: {
    sectionName: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
  .section-name {
    color: white;
    padding: 0 15px 5px;
    font-size: 10px;
    opacity: 0.5;
  }
</style>

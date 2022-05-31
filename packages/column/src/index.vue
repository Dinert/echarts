<template>
  <div class="e_chart">
    {{msg}}
  </div>
</template>

<script>
import '../../../src/scss/index.scss';
export default {
  name: "column",
  props: {
    msg: {
      type: String,
      default: 'aaaaaaaaaaaaaaaaaaaaa'
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
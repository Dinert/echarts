<template>
  <div class="e_chart">
    <slot>{{msg}}</slot>
  </div>
</template>

<script>
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
@import url('../../../src/scss/index.scss');
</style>
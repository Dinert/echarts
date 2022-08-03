<template>
  <div class="e_chart">
    <div :id="id"></div>
  </div>
</template>

<script>
import myMixins from '#/mixins/index'
import "@/scss/index.scss";
export default {
  name: "DChart",
  mixins: [myMixins],
  props: {
    chartData: {
      type: Object,
      default: () => {}
    },
    options: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
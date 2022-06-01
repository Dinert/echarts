<template>
  <div class="e_chart">
    <div :id="id"></div>
  </div>
</template>

<script>
import myMixins from '#/mixins/index'
import "@/scss/index.scss";
export default {
  name: "Column",
  mixins: [myMixins],
  props: {
    chartData: {
      type: Object,
      default: () => {}
    },
    defaultOptions: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style lang="scss" scoped>
// .e_chart{
//   width: 400px;
// }
</style>
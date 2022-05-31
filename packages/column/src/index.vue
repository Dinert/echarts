<template>
  <div class="e_chart">
    <div :id="id"></div>
  </div>
</template>

<script>
import echarts from "#/default/echarts";
import options from "#/default/options";
import { getUuid } from "@/utils/tools.js";
import "@/scss/index.scss";
export default {
  name: "column",
  props: {
    msg: {
      type: String,
      default: "aaaaaaaaaaaaaaaaaaaaa",
    },
  },
  data() {
    return {
      id: "",
      chartDom: "",
      chart: null,
    };
  },
  created() {
    this.id = "e_chart_" + getUuid();
    console.log(options, "aaaaaaaaaaaaa");
    console.log(echarts, "this.echartsthis.echarts");
  },
  mounted() {
    this.chartDom = document.getElementById(this.id);
    this.chart = echarts.init(this.chartDom);
    let option = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "line",
        },
      ],
    };

    this.chart.setOption({...option, ...options});
  },
};
</script>

<style lang="scss" scoped>
// .e_chart{
//   width: 400px;
// }
</style>
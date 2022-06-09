import echarts from "#/default/echarts";
import defaultOptions from "#/default/options";
import { resize } from "@/utils/tools.js";
import { getUuid } from "@/utils/tools.js";
import _ from 'lodash'
export default {
  data() {
    return {
      id: "",
      chartDom: "",
      chart: null,
    };
  },
  created() {
    this.id = "e_chart_" + getUuid();
  },
  mounted() {

    // 初始化图表
    this.chartDom = document.getElementById(this.id);
    this.chart = echarts.init(this.chartDom);

    // 默认配置
    let propDfaultOptions = _.defaultsDeep(this.options, defaultOptions)

    // 数据组装完成
    let options = _.defaultsDeep(this.chartData, propDfaultOptions)

    // 数据组装完成的回调
    if(typeof options.configCallback === 'function') {
      options = options.configCallback(options, this.chart)
    }else {
      this.$emit('config-callback', options, this.chart, value => {
        options = value
      })
    }

    // 渲染图表
    this.chart.setOption(options, true);

    // 图表渲染完成
    typeof options.callback === 'function' && options.callback(this.chart, options)
    this.$emit('callback', this.chart, options)
    resize(() => {
      this.chart.resize()
    }, 10)
  },
}
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
      timer: null,
      dataIndex: 0
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

    // 是否显示暂无数据
    if(options.series && options.series.length && options.series[0].data && options.series[0].data.length) {
      options.graphic.invisible = true
    }

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

    if(options._autoTooltip && options.series && options.series.length) {
      this.autoTooltipPlay(this.chart, this.dataIndex, options)
      this.chart.on('mouseover', event => {
        this.timer && clearTimeout(this.timer)
      })
      this.chart.on('mouseout', event => {
        this.autoTooltipPlay(this.chart, this.dataIndex, options)
      })
    }

    // 图表渲染完成
    typeof options.callback === 'function' && options.callback(this.chart, options)
    this.$emit('callback', this.chart, options)
    resize(() => {
      this.chart.resize()
    }, 10)
  },
  methods: {
    autoTooltipPlay(chart, index, options) {
      this.timer = setTimeout(() => {
        chart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: index
        })
        this.timer && clearTimeout(this.timer)
        console.log(this.dataIndex, 'aaaaaaaaaaaaaa')
        options.series[0].data.length === this.dataIndex + 1 ? (this.dataIndex = 0) : this.dataIndex ++
        this.autoTooltipPlay(chart, this.dataIndex, options)
      }, 3000)
    }
  }
}
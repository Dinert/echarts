import echarts from "#/default/echarts";
import defaultOptions from "#/default/options";
import { resize, getUuid } from "@/utils/tools.js";
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

    const otherParams = ['callback', 'config-callback', '_autoTooltip']

    // 初始化图表
    this.chartDom = document.getElementById(this.id);
    this.chart = echarts.init(this.chartDom);

    // 默认配置
    const propDfaultOptions = _.defaultsDeep(this.options, defaultOptions)

    // 数据组装完成
    let options = _.defaultsDeep(this.chartData, propDfaultOptions)

    // 设置默认颜色
    this.setGradualColors(options)

    // 是否显示暂无数据
    if(options.series && options.series.length && options.series[0].data && options.series[0].data.length) {
      options.graphic.invisible = true
    }

    // 数据组装完成的回调
    if(typeof options.configCallback === 'function') {
      options = options.configCallback(options, this.chart)
    }else {
      this.$emit('config-callback', options, this.chart, value => {
        if(Object.prototype.toString.call(value) === '[object Object]' && JSON.stringify(value) !== '{}') {
          options = value
        }
      })
    }

    // 获取需要的echarts的options
    const echartOptions = {}
    for(const prop in options) {
      if(!otherParams.includes(prop)) {
        echartOptions[prop] = options[prop]
      }
    }
    
    // 根据不同的type生成不同的默认配置项
      this.setOptions(echartOptions, this.type)

    // 渲染图表
    this.chart.setOption(echartOptions, true);

    // 是否自动播放tooltip
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
    if(typeof options.callback === 'function') {
       options.callback(this.chart, options)
    }else {
      this.$emit('callback', this.chart, options)
    } 

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
        options.series[0].data.length === this.dataIndex + 1 ? (this.dataIndex = 0) : this.dataIndex ++
        this.autoTooltipPlay(chart, this.dataIndex, options)
      }, 3000)
    },

    // 根据不同type设置不同默认配置项
    setOptions(echartOptions, type) {
      if(type === 'line') {
        echartOptions.xAxis =  echartOptions.xAxis || [{}]
        echartOptions.yAxis =  echartOptions.yAxis || [{}]
      }
    },

    setGradualColors(options) {
      const color = []
        if(options._isGradualColors) {
          options.color.forEach(item => {
            let endColor = item.replace('#', '')
            let endColorList = [
              parseInt(endColor.substring(0, 2), 16),
              parseInt(endColor.substring(2, 4), 16),
              parseInt(endColor.substring(4, 6), 16)
            ]
            let scale = 0.7
            color.push(
              new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: item },
                {
                  offset: 1,
                  color: `rgb(${endColorList[0] +
                    endColorList[1] * scale},${endColorList[1] +
                    endColorList[2] * scale},${endColorList[2] +
                    endColorList[0] * scale})`
                }
              ])
            )
          })
        }
        options.color = color;
    }
  }
}
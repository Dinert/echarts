import echarts from "#/default/echarts";
import defaultOptions from "#/default/options";
import { getUuid } from "@/utils/tools.js";
import _ from 'lodash'
export default {
  data() {
    return {
      chartKey: false,
      id: "",
      chartDom: "",
      chart: null,
      timerTooltip: null,
      timerDownPlay: null,
      dataIndexTooltip: 0,
      dataIndexDownPlay: 0,
      seriesIndexTooltip: 0
    };
  },
  computed: {
    chartDataCopy() {
      return _.cloneDeep(this.chartData)
    }
  },
  created() {
    this.id = "e_chart_" + getUuid();
  },
  mounted() {

    // 初始化图表
    this.chartDom = document.getElementById(this.id);
    this.chart = echarts.init(this.chartDom);

    this.initChart()

    this.chart.resize()

    this.resize =  _.debounce(() =>{
        this.initChart()
        this.chart.resize()
    }, 10),

    window.addEventListener('resize', this.resize, true)

  },

  destroyed() {
      window.removeEventListener('resize', this.resize, true)
  },

  methods: {


    // 初始化图表
    initChart() {
      const otherParams = ['callback', 'config-callback', '_autoTooltip', '_autoDownPlay']


      // 默认配置
      const propDfaultOptions = _.defaultsDeep(_.cloneDeep(this.options), defaultOptions)

      // 数据组装完成
      let options = _.defaultsDeep(_.cloneDeep(this.chartData), propDfaultOptions)

      // 设置默认颜色
      this.setGradualColors(options)

      // 是否显示暂无数据
      if (options.series && options.series.length && options.series[0].data && options.series[0].data.length) {
        options.graphic.invisible = true
      }

      // 数据组装完成的回调
      if (typeof options.configCallback === 'function') {
        options = options.configCallback(options, this.chart)
      } else {
        this.$emit('config-callback', options, this.chart, value => {
          if (Object.prototype.toString.call(value) === '[object Object]' && JSON.stringify(value) !== '{}') {
            options = value
          }
        })
      }

      // 获取需要的echarts的options
      const echartOptions = {}
      for (const prop in options) {
        if (!otherParams.includes(prop)) {
          echartOptions[prop] = options[prop]
        }
      }

      // 根据不同的type生成不同的默认配置项
      this.setOptions(echartOptions, this.type)

      // 渲染图表
      this.chart.setOption(echartOptions, true);

      // 是否自动播放tooltip
      if (options._autoTooltip && options.series && options.series.length > 0 && options.series[0].data && options.series[0].data.length > 0) {
        this.dataIndexTooltip = 0
        this.autoTooltipPlay(this.chart, this.dataIndexTooltip,  options)
        this.chart.on('mouseover', event => {
          this.cleartTooltipTimerout()
        })
        this.chart.on('mouseout', event => {
          this.autoTooltipPlay(this.chart, this.dataIndexTooltip, options)
        })
      }

      // 是否自动播放DownPlay
      if (options._autoDownPlay && options.series && options.series.length > 0 && options.series[0].data && options.series[0].data.length > 0) {
        this.dataIndexDownPlay = 0
        this.autoDownPlay(this.chart, this.dataIndexDownPlay, options)
        this.chart.on('mouseover', event => {
          const index = event.dataIndex

          // 取消轮播选中
          this.chart.dispatchAction({
              type: 'downplay',
              seriesIndex: 0
          })

          this.chart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: index
          })

          this.clearDownTimerDownPlay()
        })
        this.chart.on('mouseout', event => {

          // 取消轮播选中
          this.chart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0
          })
          this.autoDownPlay(this.chart, this.dataIndexDownPlay, options)
        })
      }

      // 图表渲染完成
      const timer = setTimeout(() => {
        this.chart.resize()
        clearTimeout(timer)
      })
      if (typeof options.callback === 'function') {
        options.callback(this.chart, options)
      } else {
        this.$emit('callback', this.chart, options)
      }
    },

    // 清除tooltip定时器
    cleartTooltipTimerout() {
      this.timerTooltip && clearTimeout(this.timerTooltip)
      this.timerTooltip = null
    },

    // 清除downPlay的定时器
    clearDownTimerDownPlay() {
      this.timerDownPlay && clearTimeout(this.timerDownPlay)
      this.timerDownPlay = null
    },


    // 自动播放tooltip
    autoTooltipPlay(chart, index, options) {
      if(this.timerTooltip === null) {
        this.timerTooltip = setTimeout(() => {
          this.findDataSeries(options.series, index)

          chart.dispatchAction({
            type: 'showTip',
            seriesIndex: this.seriesIndexTooltip,
            dataIndex: index
          })
          this.$emit('auto-tooltip-callback', this.chart, this.seriesIndexTooltip, index)

          options.series[0].data.length === this.dataIndexTooltip + 1 ? (this.dataIndexTooltip = 0) : this.dataIndexTooltip ++
          this.cleartTooltipTimerout()
          this.autoTooltipPlay(chart, this.dataIndexTooltip, options)
        }, options._autoTooltip)
      }
    },

    // 自动播放downplay
    autoDownPlay(chart, index, options) {
      if(this.timerDownPlay === null) {
        this.timerDownPlay = setTimeout(() => {

          chart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
          })
          chart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: index
          })

          this.$emit('auto-downplay-callback', this.chart, index)
          options.series[0].data.length === this.dataIndexDownPlay + 1 ? (this.dataIndexDownPlay = 0) : this.dataIndexDownPlay++
          this.clearDownTimerDownPlay()
          this.autoDownPlay(chart, this.dataIndexDownPlay, options)
        }, options._autoDownPlay)
      }

    },


    // 根据不同type设置不同默认配置项
    setOptions(echartOptions, type) {
      if (type === 'line') {
        echartOptions.xAxis = echartOptions.xAxis || [{}]
        echartOptions.yAxis = echartOptions.yAxis || [{}]
      }
    },

    // 找到有数据的series
    findDataSeries(series, index) {
      if(!series[this.seriesIndexTooltip] || !series[this.seriesIndexTooltip].data) {
        this.seriesIndexTooltip = 0
        return
      }

        const data = series[this.seriesIndexTooltip].data[index]
        if(!data) {
          this.seriesIndexTooltip ++
          this.findDataSeries(series, index)
        }

    },

    setGradualColors(options) {
      const color = []
      if (options._isGradualColors && options.color && typeof options.color[0] === 'string') {
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
        options.color = color;
      }
    }
  },
  watch: {
    chartDataCopy: {
      handler(newVal, oldVal) {

        if(!_.isEqual(newVal, oldVal)) {
          this.cleartTooltipTimerout()
          this.clearDownTimerDownPlay()
          this.initChart()
        }
      },
      deep: true,
    }
  }
}
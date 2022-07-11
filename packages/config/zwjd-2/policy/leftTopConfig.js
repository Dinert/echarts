
export default {
  color: {
    colorStops: [
      {
        offset: 0,
        color: '#41EBCD'
      },
      {
        offset: 1,
        color: '#0485E9'
      }
    ]
  },
  yAxis: [
    {
      axisTick: 'none'
    },
    {
      type: 'value',
      max: 100,
      splitLine: { show: false },
      axisLine: { lineStyle: { color: '#B1B9C4' } },
      nameTextStyle: {},
      splitNumber: 1.5,
      axisTick: 'none',
      axisLabel: {
        formatter: '{value} %'
      }
    }
  ],
  xAxis: [
    {
      axisTick: 'none'
    }
  ],
  series: [
    {
      connectNulls: true
    },
    {
      connectNulls: true
    }
  ],
  tooltip: {
    axisPointer: {
      type: 'shadow'
    },
    formatter: params => {
      let templete = ''
      for (let i = 0; i < params.length; i++) {
        let item = params[i]
        let bgColor =
          item.color.colorStops[item.color.colorStops.length - 1].color
        item.marker = item.marker.replace(
          'background-color:[object Object];',
          `background-color:${bgColor};`
        )
        if (item.seriesType === 'line') {
          templete +=
            '<div class="text-left">' +
            item.marker +
            item.seriesName +
            `: ` +
            item.data +
            '%' +
            '</div>'
        } else {
          templete +=
            '<div class="text-left">' +
            item.marker +
            item.seriesName +
            `: ` +
            item.data +
            '</div>'
        }
      }
      return templete
    }
  },
  series: [],
  configCallback: options => {
    const series = options.series
    for (let i = 0; i < series.length; i++) {
      let serie = series[i]
      serie.line = {
        lineStyle: {
          shadowBlur: 1,
          shadowColor: 'rgba(0,10,10,0.3)',
          shadowOffsetY: 5
        },
        smooth: true,
        showSymbol: false
      }
    }
    return options
  }
}

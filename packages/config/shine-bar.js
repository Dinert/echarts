import echarts from "../default/echarts"
export default {
  backgroundColor: '#133A7D',
  grid: {
    top: '2%',
    bottom: -15,
    right: 30,
    left: 30,
    containLabel: true
  },
  xAxis: {
    show: false
  },
  yAxis: [{
    triggerEvent: true,
    show: true,
    inverse: true,
    data: ['user3', 'user4', 'user4', 'user3', 'user2', 'user2', 'user2', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'user1', 'user1'],
    axisLine: {
      show: false
    },
    splitLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false,
      interval: 0,
      color: '#fff',
      align: 'left',
      margin: 80,
      fontSize: 13,
      formatter: function (value, index) {
        return '{title|' + value + '}'
      },
      rich: {
        title: {
          width: 165
        }
      }
    },
  }, {
    type: 'category',
    inverse: true,
    axisTick: 'none',
    axisLine: 'none',
    axisLabel: {
      textStyle: {
        color: '#ffffff',
        fontSize: '16',
      },
      margin: 8,
    },
    data: [53, 44, 24, 23, 20, 20, 20, 10, 10, 10],
  }],
  tooltip: {
    show: false,
  },
  series: [{
    type: 'pictorialBar',
    symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAZlBMVEUAAABe3uVe3+Vf3uVf3+Zf3uVg3+Zg3+Zf3+Vi4OZh4OZg3+Z86/Bh3+Zi4Odj4Odi4OZ86/B76/B86/Bj4ed56+9x5+xn4umB7/N87PB36e+A7/N+7fF/7vJ/7vJ+7fGA7/OB7/PReX+lAAAAIXRSTlMABQkVDREmIhk3MR10LEFFPHh7cUprXE35h2XnqMLAp+mHAG9cAAAB5ElEQVRIx83WjU7CMBQFYIoiKMqU/XUboHv/l/Tce7t2XamDNSacETEmX86tlK2rx4py150o+MstMBLwWRfHKo6JCVxLnvmFGBjFQ58oF1//sUZhGy/ClSTWObgnL4O+bkeN4nY2okfNMbkRt9/vtxz8InoTsWplJSCzFxPmO8+GpSIByX3YQAuGDWtRKhKjCnxDXhF6Z4yxnZ20Wgko7BMRDmxtSGVaI4kdTIgb+zTYoJQlIMlDlmUFgrcDWWC201qSayqlTkiCddWWeV62VU0YlnpRi9VOKaSUsiyq/N0krwq2Ugt7lVpZl5BfHNiytjagMi+XYp0kCR45hMlivVQrE/uU5pXSrCB5bM6d1t2lOZItMqmliT3q5uVxqxzyW/ccfYLNKx7ZTeykMvNyac2yt2Fbc61MHLSC0rwoxbiNdlQ3GBm1NLHQsHUrtEXppR/ljNpW6DbSCoqlFiVoN6YdaFlgsSFVPs1BdT8OaB5QyQzVcaqWDows/zepxR8ObLglTrdtCRVuRNj4Rrxh+//0ke2f8KVL+Kon3GCSbmsJN9OUW3j6g0Ns+LgCij2u0h+Sghc8mlMPBMgdx5DFh59VmOVHrvmDnoNxCz3J7MFWsMuaLyR089xz/xhlfijvwutR8gv3zk6BLUUeCgAAAABJRU5ErkJggg==',
    symbolSize: [50, 50],
    symbolOffset: [20, 0],
    z: 12,
    itemStyle: {
      normal: {
        color: '#14b1eb',
      },

    },
    data: [{ value: 53, symbolPosition: 'end' },
    { value: 44, symbolPosition: 'end' },
    { value: 24, symbolPosition: 'end' },
    { value: 23, symbolPosition: 'end' },
    { value: 20, symbolPosition: 'end' },
    { value: 20, symbolPosition: 'end' },
    { value: 20, symbolPosition: 'end' },
    { value: 10, symbolPosition: 'end' },
    { value: 10, symbolPosition: 'end' },
    { value: 10, symbolPosition: 'end' }]
  }, {
    name: '',
    type: 'bar',
    showBackground: true,
    yAxisIndex: 0,
    data: [{ "name": "user3", "value": 53, "sum": 50 }, { "name": "user4", "value": 44, "sum": 60 }, { "name": "user4", "value": 24, "sum": 60 }, { "name": "user3", "value": 23, "sum": 50 }, { "name": "user2", "value": 20, "sum": 10 }, { "name": "user2", "value": 20, "sum": 10 }, { "name": "user2", "value": 20, "sum": 10 }, { "name": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "value": 10, "sum": 10 }, { "name": "user1", "value": 10, "sum": 10 }, { "name": "user1", "value": 10, "sum": 10 }],
    barWidth: 10,
    // align: left,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(
          0,
          0,
          1,
          0,
          [{
            offset: 0,
            color: '#56D0A4'
          },
          {
            offset: 1,
            color: '#8BF7E4'
          }
          ],
          false
        ),
        barBorderRadius: 10
      },
    },

    backgroundStyle: {
      borderRadius: 10
    },
    label: {
      normal: {
        color: '#fff',
        show: true,
        position: [0, '-20px'],
        textStyle: {
          fontSize: 16
        },
        formatter: function (a, b) {
          return a.name
        },
      }
    }
  }]
}
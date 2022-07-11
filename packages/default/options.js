import color from './colors'
export default {
  tooltip: {},
  graphic: {
    type: 'text',     // 类型：文本
    left: 'center',
    top: 'middle',
    silent: true,     // 不响应事件
    style: {
        fill: '#9d9d9d',
        fontWeight: 'bold',
        text: '暂无数据',
        fontFamily: 'Microsoft YaHei',
        fontSize: '25px'
    }
  },
  color
}
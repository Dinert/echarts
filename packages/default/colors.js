import echarts from './echarts'
const colorList = [
  '#37A2DA',
  '#32C5E9',
  '#67E0E3',
  '#9FE6B8',
  '#FFDB5C',
  '#ff9f7f',
  '#fb7293',
  '#E062AE',
  '#E690D1',
  '#e7bcf3',
  '#9d96f5',
  '#8378EA',
  '#96BFFF'
]
const color = []
 colorList.forEach((v, i) => {
  let endColor = v.replace('#', '')
  let endColorList = [
    parseInt(endColor.substring(0, 2), 16),
    parseInt(endColor.substring(2, 4), 16),
    parseInt(endColor.substring(4, 6), 16)
  ]
  let scale = 0.7
  color.push(
    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: v },
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
export default color
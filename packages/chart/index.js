import DChart from './src/index.vue'
DChart.install = (Vue) => {
  Vue.component(DChart.name, DChart)
}

export default DChart
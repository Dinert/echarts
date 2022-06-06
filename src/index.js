
import DChart from '../packages/chart/index.js'

function install(Vue) {
  Vue.component(DChart.name, DChart)
}

export {
  DChart
}


export default install  //umd
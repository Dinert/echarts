# Vue components based on echarts secondary encapsulation 
<a href="http://cdn.jsdelivr.net/npm/vue@2/dist/vue.js">
    <img src="https://img.shields.io/badge/vue-2.2.25-brightgreen" alt="vue">
</a>
<a href="https://echarts.apache.org/zh/index.html">
    <img src="https://img.shields.io/badge/echarts-5.3.2-brightgreen" alt="element-plus">
</a>
<a href="https://www.lodashjs.com/">
    <img src="https://img.shields.io/badge/lodash-4.17.21-brightgreen" alt="element-plus">
</a>

## Installation

#### Using npm:
```shell
$ npm i '@dinert/echarts'
$ yarn add '@dinert/echarts'
```

#### In a browser：
```html
<script src="http://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
<script src="lib-umd.js"></script>
```

#### In a Esm
```html
<template>
    <div style="height: 400px;">
     <d-echart @callback="callback" @config-callback="configCallback" :chart-data="chartData"></d-echart>
    </div>
</template>
<script>
    import {DEChart} from '@dinert/echarts'

    export default {
        components: {
            DEChart
        }
    }
</script>
```

### DEchart Attributes
|    参数    |       说明        |  类型  |      可选值       | 默认值 |
| :--------: | :---------------: | :----: | :---------------: | :----: |
| chart-data | echarts的options  | Object |        一         |   {}   |
|    type    | echarts的图表类型 | Object | echarts的图表类型 |  line  |

### chart-data下的echarts额外属性
| 参数  | 说明  | 类型  | 可选值 | 默认值 |
| :---: | :---: | :---: | :----: | :----: |


### DEchart Events
#### 注意事项
1、当chart-data中有configCallback和callback的函数时，执行的是chart-data对象中的configCallback和callback
2、如果要执行下面的函数请删除chart-data属性中的configCallback和callback
3、cb是一个函数回调的是echarts的配置项，图表渲染时会使用这个配置项，所以请这样使用cb({})，对象为空时不会使用。
|    事件名称    |        说明        |       回调参数       |
| :------------: | :----------------: | :------------------: |
| configCallback | 图表渲染之前的回调 | (options, chart, cb) |
|    callback    | 图表渲染完成的回调 |   (chart, options)   |





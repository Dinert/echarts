import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import autoprefixer from 'autoprefixer'
import vue from 'rollup-plugin-vue'
import alias from '@rollup/plugin-alias'
import replace from 'rollup-plugin-replace'

const env = process.env.NODE_ENV
const path = require('path')
const resolveDir = dir => path.join(__dirname, dir)
export default {
  input: './src/index.js',
  output: [
    {
      file: './dist/lib-umd.js',
      format: 'umd',
      name: 'lib',
      sourcemap: true,
      globals: {
        echarts: 'echarts',
        lodash: '_'
      }
    },
    {
      file: './dist/lib-es.js',
      format: 'es',
      sourcemap: true
    },
    {
      file: './dist/lib-cjs.js',
      format: 'cjs',
      sourcemap: true
    }
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs(),
    resolve(),
    postcss({
      plugins: [
        autoprefixer(),
      ]
    }),
    alias({
      entries: [
        {find: '@', replacement: resolveDir('src')},
        {find: '#', replacement: resolveDir('packages')}
      ]
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    livereload(),
    serve({
      port: 3003,
      contentBase: ''
    }),
    vue({
      style: {
        postcssPlugins: [
          autoprefixer()
        ]
      }
    }),
  ],
  external: [  //外部库， 使用'umd'文件时需要先引入这个外部库
    'vue',
    'echarts',
    'lodash'
  ],
  watch: {  // 配置监听处理
    exclude: 'node_modules/**'
  }
}
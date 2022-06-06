import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'
import vue from 'rollup-plugin-vue'
import { terser } from 'rollup-plugin-terser'
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
      sourcemap: true
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
        cssnano()
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
    vue({
      style: {
        postcssPlugins: [
          autoprefixer()
        ]
      }
    }),
    terser()
  ],
  external: [  //外部库， 使用'umd'文件时需要先引入这个外部库
    'vue',
    'echarts',
    'lodash'
  ],
}
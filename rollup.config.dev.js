import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import autoprefixer from 'autoprefixer'
import vue from 'rollup-plugin-vue'
export default {
  input: './src/index.js',
  output: [
    {
      file: './dist/lib-umd.js',
      format: 'umd',
      name: 'lib'
    },
    {
      file: './dist/lib-es.js',
      format: 'es'
    },
    {
      file: './dist/lib-cjs.js',
      format: 'cjs'
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
    'vue'
  ],
  watch: {  // 配置监听处理
    exclude: 'node_modules/**'
  },
}
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'
import vue from 'rollup-plugin-vue'
import { terser } from 'rollup-plugin-terser'
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
    postcss({
      plugins: [
        autoprefixer(),
        cssnano()
      ]
    }),
    vue({
      style: {
        postcssPlugins: [
          autoprefixer()
        ]
      }
    }),
    terser()
  ]
}
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default [
  {
    input: 'index.js',
    output: {
      file: 'lib/index.cjs.js',
      format: 'cjs'
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({ babelHelpers: 'bundled' })
    ]
  },
  {
    input: 'index.js',
    output: {
      file: 'lib/index.js',
      format: 'esm'
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({ babelHelpers: 'bundled' })
    ]
  },
]

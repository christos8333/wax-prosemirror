import babel from 'rollup-plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from '@rollup/plugin-node-resolve'
import url from '@rollup/plugin-url'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

export default {
  input: './index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    postcss({
      plugins: [],
      minimize: true,
      sourceMap: 'inline',
    }),
    external({
      includeDependencies: true,
    }),
    url(),
    resolve(),
    babel({
      presets: [
        'react-app',
      ],
      plugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        "babel-plugin-parameter-decorator",
        ["@babel/plugin-proposal-class-properties", { loose: true }],
      ],
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    commonjs(),
    terser(),
  ],
}

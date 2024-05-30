import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import css from 'rollup-plugin-import-css';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'esm',
      sourcemap: false,
    },
  ],
  plugins: [
    css(),
    external({
      includeDependencies: true,
    }),
    babel({
      babelHelpers: 'runtime',
      presets: ['react-app'],
      plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        'babel-plugin-parameter-decorator',
      ],
      exclude: 'node_modules/**',
    }),
    commonjs(),
    terser(),
  ],
  external: [],
};

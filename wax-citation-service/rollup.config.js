import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import css from 'rollup-plugin-import-css';
import { terser } from 'rollup-plugin-terser';
import fs from 'fs';
import path from 'path';

export default {
  input: 'index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'esm',
      sourcemap: false,
    },
  ],
  plugins: [
    css(),
    {
      name: 'raw-loader',
      resolveId(id, importer) {
        if (id.endsWith('?raw')) {
          const actualId = id.slice(0, -4); // Remove ?raw
          const resolved = path.resolve(path.dirname(importer), actualId);
          return resolved + '?raw';
        }
        return null;
      },
      load(id) {
        if (id.endsWith('?raw')) {
          const actualId = id.slice(0, -4); // Remove ?raw
          const content = fs.readFileSync(actualId, 'utf-8');
          return `export default ${JSON.stringify(content)};`;
        }
        return null;
      },
    },
    external({
      includeDependencies: true,
    }),
    babel({
      babelHelpers: 'runtime',
      presets: ['react-app'],
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            regenerator: true,
          },
        ],
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        'babel-plugin-parameter-decorator',
      ],
      exclude: 'node_modules/**',
    }),
    commonjs(),
    terser(),
  ],
  external: ['uuid', 'react', 'react-dom', 'lodash', 'prosemirror-model'],
};

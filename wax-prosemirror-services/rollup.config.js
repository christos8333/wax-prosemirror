import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

export default {
  input: "./index.js",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: true
    }
  ],
  plugins: [
    postcss({
      plugins: [],
      minimize: true,
      sourceMap: "inline"
    }),
    external({
      includeDependencies: true
    }),
    resolve(),
    babel({
      presets: [
        [require("@babel/preset-env"), { modules: false }],
        require("@babel/preset-react")
      ],
      plugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        "babel-plugin-parameter-decorator",
        ["@babel/plugin-proposal-class-properties", { loose: true }]
      ],
      exclude: "node_modules/**",
      runtimeHelpers: true
    }),
    commonjs(),
    terser()
  ],
  external: ["uuid", "react", "react-dom", "wax-prosemirror-schema", "lodash"]
};

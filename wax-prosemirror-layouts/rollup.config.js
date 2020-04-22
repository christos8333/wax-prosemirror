import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
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
  external: [
    "@fortawesome/react-fontawesome",
    "react-dropdown",
    "inversify",
    "prosemirror-dev-tools",
    "lodash",
    "react-is",
    "uuid",
    "wax-prosemirror-schema",
    "wax-prosemirror-core",
    "wax-prosemirror-themes",
    "wax-prosemirror-components"
  ]
};

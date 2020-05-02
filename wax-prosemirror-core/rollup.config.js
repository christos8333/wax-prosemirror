import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
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
    external({
      includeDependencies: true
    }),
    babel({
      presets: ["react-app"],
      plugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        "babel-plugin-parameter-decorator"
      ],
      exclude: "node_modules/**",
      runtimeHelpers: true
    }),
    commonjs()
    // terser()
  ],
  external: [
    "@fortawesome/react-fontawesome",
    "react-dropdown",
    "uuid",
    "prop-types",
    "prosemirror-tables",
    "wax-prosemirror-services",
    "wax-prosemirror-schema",
    "wax-prosemirror-themes",
    "wax-prosemirror-layouts"
  ]
};

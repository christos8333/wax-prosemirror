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
      exclude: "node_modules/**",
      runtimeHelpers: true
    }),
    commonjs()
    // terser()
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

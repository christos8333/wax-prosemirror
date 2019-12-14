import { omit } from "lodash";
import Middleware from "../lib/Middleware";

export default class ParseRule {
  tag = "";
  exporter = {};

  constructor({ getAttrs, tag }) {
    this.tag = tag;
    this.exporter = new Middleware();
    this.addStack(getAttrs);
  }

  addStack(getAttrs) {
    this.exporter.use(getAttrs);
  }

  parseSchema(exporter) {
    return {
      tag: this.tag,
      getAttrs(dom) {
        let hooks = {};

        exporter.go({ dom }, hook => {
          hooks = hook;
        });
        return omit(hooks, ["dom"]);
      }
    };
  }

  combineRules() {
    const exporter = this.exporter;
    return this.parseSchema(exporter);
  }
}

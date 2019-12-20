import { omit } from "lodash";
import Middleware from "../lib/Middleware";

export default class ParseRule {
  tag = "";
  exporter = null;

  constructor({ getAttrs, tag }) {
    this.tag = tag;
    if (getAttrs) {
      this.exporter = new Middleware();
    }
    this.addStack(getAttrs);
  }

  addStack(getAttrs) {
    if (getAttrs) {
      this.exporter.use(getAttrs);
    }
  }

  parseSchema(exporter) {
    const rule = { tag: this.tag };
    if (this.exporter) {
      rule.getAttrs = dom => {
        let hooks = {};

        exporter.go({ dom }, hook => {
          hooks = hook;
        });
        return omit(hooks, ["dom"]);
      };
    }

    return rule;
  }

  combineRules() {
    const exporter = this.exporter;
    return this.parseSchema(exporter);
  }
}

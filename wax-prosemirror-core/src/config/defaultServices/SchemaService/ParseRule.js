import { omit } from 'lodash';
import Middleware from '../../../utilities/lib/Middleware';

export default class ParseRule {
  tag = null;
  style = null;
  exporter = null;
  defaultMiddleware = (hook, next) => {
    hook = {};
    next();
  };

  constructor({ getAttrs, tag, style }) {
    this.tag = tag;
    this.style = style;
    // if (getAttrs) {
    this.exporter = new Middleware();
    // }
    this.addStack(getAttrs);
  }

  addStack(getAttrs) {
    if (getAttrs) {
      this.exporter.use(getAttrs);
    } else {
      this.exporter.use(this.defaultMiddleware);
    }
  }

  parseSchema(exporter) {
    let rule = {};
    if (this.tag) {
      rule = { tag: this.tag };
    }

    if (this.style) {
      rule = { style: this.style };
    }

    if (this.exporter) {
      rule.getAttrs = dom => {
        let hooks = {};

        exporter.go({ dom }, hook => {
          hooks = hook;
        });
        return omit(hooks, ['dom']);
      };
    }

    return rule;
  }

  combineRules() {
    const exporter = this.exporter;
    return this.parseSchema(exporter);
  }
}

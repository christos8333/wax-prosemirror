import { isPlainObject } from 'lodash';
import Middleware from '../../../utilities/lib/Middleware';
import ParseRule from './ParseRule';

export default class Mark {
  name = '';
  importer = {};

  inline = false;
  group = '';
  content = '';
  draggable = false;
  inclusive = true;
  excludes = '';
  _attrs = {};
  _parseRules = [];

  constructor(name) {
    this.name = name;
    this.importer = new Middleware();
  }

  fromJSON(config) {
    for (let key in config) {
      let value = config[key];
      this[key] = value;
    }
  }

  set toDOM(value) {
    this.importer.use(value);
  }

  set attrs(value) {
    Object.assign(this._attrs, value);
  }

  set parseDOM(parseDom) {
    let values = parseDom;
    if (isPlainObject(parseDom)) {
      values = [parseDom];
    }
    values.forEach(value => {
      let parseRule = this._parseRules.find(parseRule => {
        if (value.tag) return parseRule.tag === value.tag;
        if (value.style) return parseRule.style === value.style;
        return false;
      });
      if (!parseRule) {
        parseRule = new ParseRule(value);
        this._parseRules.push(parseRule);
      }
      parseRule.addStack(value.getAttrs);
    });
  }

  toJSON() {
    const { importer } = this;

    return {
      inline: this.inline,
      group: this.group,
      content: this.content,
      draggable: this.draggable,
      inclusive: this.inclusive,
      excludes: this.excludes,
      attrs: this._attrs,
      parseDOM: this._parseRules.map(rule => rule.combineRules()),
      toDOM: node => {
        let hooks = {};

        importer.go({ node }, hook => {
          hooks = hook;
        });
        return hooks.value;
      },
    };
  }
}

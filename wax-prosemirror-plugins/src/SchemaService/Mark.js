import ParseRule from "./ParseRule";
import Middleware from "../lib/Middleware";

export default class Mark {
  name = "";
  importer = {};

  inline = false;
  group = "";
  content = "";
  draggable = false;
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

  set parseDOM(value) {
    let parseRule = this._parseRules.find(
      parseRule => parseRule.tag === value.tag
    );
    if (!parseRule) {
      parseRule = new ParseRule(value);
      this._parseRules.push(parseRule);
    }
    parseRule.addStack(value.getAttrs);
  }

  toJSON() {
    const importer = this.importer;

    return {
      inline: this.inline,
      group: this.group,
      content: this.content,
      draggable: this.draggable,
      attrs: this._attrs,
      parseDOM: this._parseRules.map(rule => rule.combineRules()),
      toDOM: node => {
        let hooks = {};

        importer.go({ node }, hook => {
          hooks = hook;
        });
        return hooks.value;
      }
    };
  }
}

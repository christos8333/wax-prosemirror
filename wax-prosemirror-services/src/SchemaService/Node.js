/* eslint-disable no-underscore-dangle */
import { Middleware } from 'wax-prosemirror-core';
import { isPlainObject } from 'lodash';
import ParseRule from './ParseRule';

export default class Node {
  name = '';
  importer = {};

  atom = false;
  inline = false;
  isolating = false;
  draggable = false;
  group = '';
  content = '';
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
      atom: this.atom,
      inline: this.inline,
      group: this.group,
      content: this.content,
      isolating: this.isolating,
      draggable: this.draggable,
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

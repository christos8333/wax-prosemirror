import { injectable } from 'inversify';
import {
  inputRules,
  wrappingInputRule,
  textblockTypeInputRule,
  smartQuotes,
} from 'prosemirror-inputrules';

// TODO add through service.
import inlineInputRule from '../MathService/InlineInputRule';
import blockInputRule from '../MathService/BlockInputRule';

@injectable()
class Rules {
  constructor(plugins, schema) {
    this.PmPlugins = plugins;

    this.schema = schema;
    this.extendedRules = this.allRules();
  }

  addRule(rules) {
    this.extendedRules.push(...rules);
    // this.extendedRules = this.allRules().concat(...rules);
  }

  createRules() {
    const rulesCreated = inputRules({ rules: this.extendedRules });
    this.PmPlugins.add('rules', rulesCreated);
  }

  allRules() {
    return [
      ...smartQuotes,
      // > blockquote
      wrappingInputRule(/^\s*>\s$/, this.schema.nodes.blockquote),

      // 1. ordered list
      wrappingInputRule(
        /^(\d+)\.\s$/,
        this.schema.nodes.orderedlist,
        match => ({ order: +match[1] }),
        (match, node) => node.childCount + node.attrs.order === +match[1],
      ),

      // * bullet list
      wrappingInputRule(/^\s*([-+*])\s$/, this.schema.nodes.bulletlist),

      // ``` code block
      // textblockTypeInputRule(/^```$/, this.schema.nodes.code_block),

      // # heading
      textblockTypeInputRule(
        new RegExp('^(#{1,6})\\s$'),
        this.schema.nodes.heading,
        match => ({ level: match[1].length }),
      ),
      inlineInputRule(/(?!\\)\$(.+)(?!\\)\$/, this.schema.nodes.math_inline),
      blockInputRule(/^\$\$\s+$/, this.schema.nodes.math_display),
    ];
  }
}

export default Rules;

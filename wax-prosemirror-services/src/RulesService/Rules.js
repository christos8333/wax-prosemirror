import { injectable } from 'inversify';
import { inputRules, smartQuotes } from 'prosemirror-inputrules';

const defaultRules = [
  ...smartQuotes,
  // > blockquote
  // wrappingInputRule(/^\s*>\s$/, this.schema.nodes.blockquote),

  // // 1. ordered list
  // wrappingInputRule(
  //   /^(\d+)\.\s$/,
  //   this.schema.nodes.orderedlist,
  //   match => ({ order: +match[1] }),
  //   (match, node) => node.childCount + node.attrs.order === +match[1],
  // ),

  // // * bullet list
  // wrappingInputRule(/^\s*([-+*])\s$/, this.schema.nodes.bulletlist),

  // // ``` code block
  // // textblockTypeInputRule(/^```$/, this.schema.nodes.code_block),

  // // # heading
  // textblockTypeInputRule(
  //   new RegExp('^(#{1,6})\\s$'),
  //   this.schema.nodes.heading,
  //   match => ({ level: match[1].length }),
  // ),
];

@injectable()
class Rules {
  extendedRules = defaultRules;
  addRule(rule) {
    this.extendedRules.push(...rule);
  }

  createRules() {
    const rulesCreated = inputRules({ rules: this.extendedRules });
    return rulesCreated;
  }
}

export default Rules;

import { injectable } from "inversify";
import {
  inputRules,
  wrappingInputRule,
  textblockTypeInputRule,
  smartQuotes
} from "prosemirror-inputrules";

@injectable()
class Rules {
  constructor(schema, plugins) {
    this.PmPlugins = plugins;
    this.extendedRules = this.allRules();
  }

  addRule(rules) {
    this.extendedRules.push(...rules);
  }

  createRules() {
    debugger;
    const rulesCreated = inputRules({ rules: this.extendedRules });
    this.PmPlugins.add("rules", rulesCreated);
  }

  allRules() {
    return [
      ...smartQuotes,
      // > blockquote
      schema => wrappingInputRule(/^\s*>\s$/, schema.nodes.blockquote),

      // 1. ordered list
      schema =>
        wrappingInputRule(
          /^(\d+)\.\s$/,
          schema.nodes.ordered_list,
          match => ({ order: +match[1] }),
          (match, node) => node.childCount + node.attrs.order === +match[1]
        ),

      // * bullet list
      schema => wrappingInputRule(/^\s*([-+*])\s$/, schema.nodes.bullet_list),

      // ``` code block
      schema => textblockTypeInputRule(/^```$/, schema.nodes.code_block),

      // # heading
      schema =>
        textblockTypeInputRule(
          new RegExp("^(#{1,6})\\s$"),
          schema.nodes.heading,
          match => ({ level: match[1].length })
        )
    ];
  }
}

export default Rules;

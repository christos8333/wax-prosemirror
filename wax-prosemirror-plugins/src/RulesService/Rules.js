import { injectable } from "inversify";
import {
  inputRules,
  wrappingInputRule,
  textblockTypeInputRule,
  smartQuotes
} from "prosemirror-inputrules";

@injectable()
class Rules {
  constructor(plugins, schema) {
    this.PmPlugins = plugins;
    debugger;
    this.schema = schema;
    this.extendedRules = this.allRules();
  }

  addRule(rules) {
    this.extendedRules.push(...rules);
  }

  createRules() {
    const rulesCreated = inputRules({ rules: this.extendedRules });
    this.PmPlugins.add("rules", rulesCreated);
  }

  allRules() {
    return [
      ...smartQuotes,
      // > blockquote
      wrappingInputRule(/^\s*>\s$/, this.schema.nodes.blockquote),

      // 1. ordered list
      wrappingInputRule(
        /^(\d+)\.\s$/,
        this.schema.nodes.ordered_list,
        match => ({ order: +match[1] }),
        (match, node) => node.childCount + node.attrs.order === +match[1]
      ),

      // * bullet list
      wrappingInputRule(/^\s*([-+*])\s$/, this.schema.nodes.bullet_list),

      // ``` code block
      schema => textblockTypeInputRule(/^```$/, schema.nodes.code_block),

      // # heading
      textblockTypeInputRule(
        new RegExp("^(#{1,6})\\s$"),
        this.schema.nodes.heading,
        match => ({ level: match[1].length })
      )
    ];
  }
}

export default Rules;

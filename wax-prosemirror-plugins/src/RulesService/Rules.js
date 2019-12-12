import { injectable, inject } from "inversify";
import {
  inputRules,
  wrappingInputRule,
  textblockTypeInputRule,
  smartQuotes
} from "prosemirror-inputrules";

@injectable()
class Rules {
  config = {};
  name = "";
  constructor(@inject("Config") config, @inject("PmPlugins") pmplugins) {
    console.log("config", config);
    // this.rules = config.rules;
    // this.schema = config.schema;
    // return inputRules(this.allRules(this.rules));
  }

  allRules(rules = []) {
    return {
      rules: [
        ...smartQuotes,
        ...rules,
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
        textblockTypeInputRule(/^```$/, this.schema.nodes.code_block),

        // # heading
        textblockTypeInputRule(
          new RegExp("^(#{1,6})\\s$"),
          this.schema.nodes.heading,
          match => ({ level: match[1].length })
        )
      ]
    };
  }
}

export default Rules;

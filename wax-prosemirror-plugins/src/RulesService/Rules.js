import { injectable, inject } from "inversify";
import {
  inputRules,
  wrappingInputRule,
  textblockTypeInputRule,
  smartQuotes
} from "prosemirror-inputrules";

@injectable()
class Rules {
  constructor(schema, plugins) {
    console.log("rules?", schema, plugins);
    this.PmPlugins = plugins;
    this.schema = schema;
  }

  addRule(rules) {
    console.log(rules);
    // return inputRules(this.allRules(rules));
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

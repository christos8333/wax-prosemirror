import {
  mathDisplayNode,
  mathInlineNode,
  mathSelectMark,
} from 'wax-prosemirror-schema';
import { mathPlugin, mathSelectPlugin } from 'wax-prosemirror-plugins';
import Service from '../Service';
import inlineInputRule from './InlineInputRule';
import blockInputRule from './BlockInputRule';

class MathService extends Service {
  name = 'MathService';

  boot() {
    this.app.PmPlugins.add('mathplugin', mathPlugin);
    this.app.PmPlugins.add('mathselectplugin', mathSelectPlugin);

    const schema = this.container.get('Schema');
    const rules = this.container.get('Rules');
    const newRules = [
      inlineInputRule(/(?!\\)\$(.+)(?!\\)\$/, schema.schema.nodes.math_inline),
      blockInputRule(/^\$\$\s+$/, schema.schema.nodes.math_display),
    ];
    // rules.addRule(newRules);
  }

  register() {
    const createNode = this.container.get('CreateNode');
    const createMark = this.container.get('CreateMark');
    createNode({
      math_display: mathDisplayNode,
    });
    createNode({
      math_inline: mathInlineNode,
    });
    createMark({
      math_select: mathSelectMark,
    });
  }
}

export default MathService;

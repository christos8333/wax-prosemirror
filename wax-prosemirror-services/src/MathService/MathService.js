import { Service } from 'wax-prosemirror-core';
import { mathDisplayNode, mathInlineNode, mathSelectMark } from './schema';
import mathPlugin from './plugins/math-plugin';
import mathSelectPlugin from './plugins/math-select';
import inlineInputRule from './InlineInputRule';
import blockInputRule from './BlockInputRule';
import './math.css';

class MathService extends Service {
  name = 'MathService';

  boot() {
    this.app.PmPlugins.add('mathplugin', mathPlugin);
    this.app.PmPlugins.add('mathselectplugin', mathSelectPlugin);
    const createRule = this.container.get('CreateRule');
    const {
      schema: { schema },
    } = this.app;

    createRule([
      blockInputRule(/^\$\$\s+$/, schema.nodes.math_display),
      inlineInputRule(/(?!\\)\$(.+)(?!\\)\$/, schema.nodes.math_inline),
    ]);
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

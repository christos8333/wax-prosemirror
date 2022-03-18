import {
  mathDisplayNode,
  mathInlineNode,
  mathSelectMark,
} from 'wax-prosemirror-schema';
import { mathPlugin, mathSelectPlugin } from 'wax-prosemirror-plugins';
import Service from '../Service';
import inlineInputRule from './InlineInputRule';
import blockInputRule from './BlockInputRule';
import './math.css';

class MathService extends Service {
  name = 'MathService';

  boot() {
    this.app.PmPlugins.add('mathplugin', mathPlugin);
    this.app.PmPlugins.add('mathselectplugin', mathSelectPlugin);
    const createRule = this.container.get('CreateRule');
    createRule([
      blockInputRule(/^\$\$\s+$/, this.schema.nodes.math_display),
      inlineInputRule(/(?!\\)\$(.+)(?!\\)\$/, this.schema.nodes.math_inline),
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

import {
  mathDisplayNode,
  mathInlineNode,
  mathSelectMark,
} from 'wax-prosemirror-schema';
import { mathPlugin, mathSelectPlugin } from 'wax-prosemirror-plugins';
import Service from '../Service';

class MathService extends Service {
  name = 'MathService';

  boot() {
    this.app.PmPlugins.add('mathplugin', mathPlugin);
    this.app.PmPlugins.add('mathselectplugin', mathSelectPlugin);
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

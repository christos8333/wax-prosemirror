import { Commands } from 'wax-prosemirror-utilities';
import Tools from '../../lib/Tools';

class CustomTagBlockTool extends Tools {
  title = 'Custom Tag Block';
  name = 'CustomTagBlock';

  get run() {
    return (state, dispatch, val) => {
      Commands.setBlockType(state.config.schema.nodes.customTagBlock, {
        class: val,
      })(state, dispatch);
    };
  }

  get active() {
    return (state, activeViewId, type) => {
      return Commands.customTagBlockActive(
        state.config.schema.nodes.customTagBlock,
        { class: type },
      )(state);
    };
  }
}

export default CustomTagBlockTool;

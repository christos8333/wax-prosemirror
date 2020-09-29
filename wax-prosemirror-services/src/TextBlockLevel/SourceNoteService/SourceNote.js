import Tools from '../../lib/Tools';
import { injectable } from 'inversify';
import { Commands } from 'wax-prosemirror-utilities';

@injectable()
class SourceNote extends Tools {
  title = 'Change to Source Note';
  label = 'Source Note';
  name = 'SourceNote';

  get run() {
    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.sourceNote, {
        class: 'source-note',
      })(state, dispatch);
    };
  }

  get active() {
    return state => {
      return Commands.blockActive(state.config.schema.nodes.sourceNote)(state);
    };
  }

  select = (state, activeViewId) => {
    if (activeViewId !== 'main') return false;
    return true;
  };

  get enable() {
    return state => {
      return Commands.setBlockType(state.config.schema.nodes.sourceNote)(state);
    };
  }
}
export default SourceNote;

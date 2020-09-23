import { injectable } from 'inversify';
import { Commands } from 'wax-prosemirror-utilities';
import Tools from '../../lib/Tools';

@injectable()
class ExtractPoetry extends Tools {
  title = 'Change to Extract Poetry';
  label = 'Extract Poetry';
  name = 'ExtractPoetry';

  get run() {
    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.extractPoetry, {
        class: 'extract-poetry',
      })(state, dispatch);
    };
  }

  select = (state, activeViewId) => {
    if (activeViewId !== 'main') return false;
    return true;
  };

  get enable() {
    return state => {
      return Commands.setBlockType(state.config.schema.nodes.extractPoetry)(
        state,
      );
    };
  }
}
export default ExtractPoetry;

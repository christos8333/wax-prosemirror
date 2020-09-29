import { injectable } from 'inversify';
import { Commands } from 'wax-prosemirror-utilities';
import Tools from '../../lib/Tools';

export default
@injectable()
class EpigraphProse extends Tools {
  title = 'Change to Epigraph Prose';
  label = 'Epigraph Prose';
  name = 'EpigraphProse';

  get run() {
    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.epigraphProse, {
        class: 'epigraph-prose',
      })(state, dispatch);
    };
  }

  get active() {
    return (state, activeViewId) => {
      return Commands.blockActive(state.config.schema.nodes.epigraphProse)(
        state,
      );
    };
  }

  select = (state, activeViewId) => {
    if (activeViewId !== 'main') return false;
    return true;
  };

  get enable() {
    return state => {
      return Commands.setBlockType(state.config.schema.nodes.epigraphProse)(
        state,
      );
    };
  }
}

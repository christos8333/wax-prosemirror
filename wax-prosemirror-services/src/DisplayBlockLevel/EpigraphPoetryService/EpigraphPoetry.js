import { injectable } from 'inversify';
import { Commands } from 'wax-prosemirror-utilities';
import Tools from '../../lib/Tools';

@injectable()
class EpigraphPoetry extends Tools {
  title = 'Change to Epigraph Poetry';
  label = 'Epigraph Poetry';
  name = 'EpigraphPoetry';

  get run() {
    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.epigraphPoetry, {
        class: 'epigraph-poetry',
      })(state, dispatch);
    };
  }

  get active() {
    return state => {
      return Commands.blockActive(state.config.schema.nodes.epigraphPoetry)(
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
      return Commands.setBlockType(state.config.schema.nodes.epigraphPoetry)(
        state,
      );
    };
  }
}

export default EpigraphPoetry;

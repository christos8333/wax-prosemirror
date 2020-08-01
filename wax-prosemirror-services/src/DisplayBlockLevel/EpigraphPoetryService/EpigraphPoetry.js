import { injectable } from 'inversify';
import { Commands } from 'wax-prosemirror-utilities';
import Tools from '../../lib/Tools';

@injectable()
class EpigraphPoetry extends Tools {
  title = 'Change to Epigraph Poetry';
  content = 'Epigraph Poetry';

  get run() {
    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.epigraphPoetry, {
        class: 'epigraph-poetry',
      })(state, dispatch);
    };
  }

  get enable() {
    return state => {
      return Commands.setBlockType(state.config.schema.nodes.epigraphPoetry)(
        state,
      );
    };
  }
}

export default EpigraphPoetry;

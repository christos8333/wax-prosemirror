import { injectable } from 'inversify';
import { wrapInList } from 'prosemirror-schema-list';
import { Commands } from 'wax-prosemirror-utilities';
import Tools from '../../lib/Tools';

export default
@injectable()
class OrderedList extends Tools {
  title = 'Wrap in ordered list';
  icon = 'numberedList';
  name = 'OrderedList';

  get run() {
    return (state, dispatch) => {
      wrapInList(state.config.schema.nodes.orderedlist)(state, dispatch);
    };
  }

  get enable() {
    return state => {
      return wrapInList(state.config.schema.nodes.orderedlist)(state);
    };
  }

  select = (state, activeViewId, activeView) => {
    if (!activeView) return false;

    const {
      selection: { from },
    } = state;
    if (from === null) return false;
    const { disallowedTools } = activeView.props;
    if (disallowedTools.includes('Lists')) return false;
    return true;
  };

  get active() {
    return state => {
      return Commands.blockActive(state.config.schema.nodes.orderedlist)(state);
    };
  }
}

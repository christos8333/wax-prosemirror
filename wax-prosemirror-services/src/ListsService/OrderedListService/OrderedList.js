import Tools from '../../lib/Tools';
import { injectable } from 'inversify';
import { icons } from 'wax-prosemirror-components';
import { wrapInList } from 'prosemirror-schema-list';
import { Commands } from 'wax-prosemirror-utilities';

@injectable()
export default class OrderedList extends Tools {
  title = 'Wrap in ordered list';
  content = icons.ordered_list;
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

  select = (state, activeViewId) => {
    if (activeViewId !== 'main') return false;
    return true;
  };

  get active() {
    return state => {
      return Commands.blockActive(state.config.schema.nodes.orderedlist)(state);
    };
  }
}

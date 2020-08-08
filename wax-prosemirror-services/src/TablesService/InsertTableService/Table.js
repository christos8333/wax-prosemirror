import Tools from '../../lib/Tools';
import { Commands } from 'wax-prosemirror-utilities';
import { injectable } from 'inversify';
import { icons } from 'wax-prosemirror-components';

@injectable()
export default class Table extends Tools {
  title = 'Insert table';
  content = icons.table;

  get run() {
    return (state, dispatch) => {
      return Commands.createTable(state, dispatch);
    };
  }

  get enable() {
    return state => {
      return Commands.canInsert(state.config.schema.nodes.table)(state);
    };
  }
}

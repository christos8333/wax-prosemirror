import { redo } from 'prosemirror-history';
import Tools from '../../lib/Tools';
import { injectable } from 'inversify';
import { icons } from 'wax-prosemirror-components';

export default
@injectable()
class Redo extends Tools {
  title = 'Redo last undone change';
  content = icons.redo;
  onlyOnMain = true;

  get run() {
    return (state, dispatch) => {
      redo(state, tr => dispatch(tr.setMeta('inputType', 'historyRedo')));
    };
  }

  get enable() {
    return redo;
  }
}

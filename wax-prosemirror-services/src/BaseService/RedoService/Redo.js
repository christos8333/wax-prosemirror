import { redo } from 'prosemirror-history';
import { injectable } from 'inversify';
import { icons } from 'wax-prosemirror-components';
import Tools from '../../lib/Tools';

export default
@injectable()
class Redo extends Tools {
  title = 'Redo last undone change';
  content = icons.redo;
  onlyOnMain = true;
  name = 'Redo';

  get run() {
    return (state, dispatch) => {
      redo(state, tr => dispatch(tr.setMeta('inputType', 'Redo')));
    };
  }

  get enable() {
    return redo;
  }
}

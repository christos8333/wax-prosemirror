import { undo } from 'prosemirror-history';
import { injectable } from 'inversify';
import { icons } from 'wax-prosemirror-components';
import Tools from '../../lib/Tools';

export default
@injectable()
class Undo extends Tools {
  title = 'Undo last change';
  content = icons.undo;
  onlyOnMain = true;

  get run() {
    return (state, dispatch) => {
      undo(state, tr => dispatch(tr.setMeta('inputType', 'Undo')));
    };
  }

  get enable() {
    return undo;
  }
}

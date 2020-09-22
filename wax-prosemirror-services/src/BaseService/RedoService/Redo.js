import { redo } from 'prosemirror-history';
import { injectable } from 'inversify';
import Tools from '../../lib/Tools';

export default
@injectable()
class Redo extends Tools {
  title = 'Redo';
  icon = 'redo';
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

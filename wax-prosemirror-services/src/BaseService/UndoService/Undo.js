import { undo } from 'prosemirror-history';
import { injectable } from 'inversify';
import Tools from '../../lib/Tools';

export default
@injectable()
class Undo extends Tools {
  title = 'Undo';
  icon = 'undo';
  onlyOnMain = true;
  name = 'Undo';

  get run() {
    return (state, dispatch) => {
      undo(state, tr => dispatch(tr.setMeta('inputType', 'Undo')));
    };
  }

  get enable() {
    return undo;
  }
}

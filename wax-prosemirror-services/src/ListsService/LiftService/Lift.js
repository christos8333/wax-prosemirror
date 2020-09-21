import { lift } from 'prosemirror-commands';
import Tools from '../../lib/Tools';
import { injectable } from 'inversify';
// import { icons } from 'wax-prosemirror-components';

export default
@injectable()
class Lift extends Tools {
  title = 'Lift out of enclosing block';
  // content = icons.lift;
  icon = 'indentDecrease';
  name = 'Lift';

  get run() {
    return lift;
  }

  get enable() {
    return lift;
  }
}

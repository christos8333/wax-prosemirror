import { lift } from 'prosemirror-commands';
import { injectable } from 'inversify';
import Tools from '../../lib/Tools';

export default
@injectable()
class Lift extends Tools {
  title = 'Lift out of enclosing block';
  icon = 'indentDecrease';
  name = 'Lift';

  select(state) {
    return lift(state);
  }

  get run() {
    return lift;
  }

  get enable() {
    return lift;
  }
}

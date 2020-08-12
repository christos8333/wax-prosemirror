import { joinUp } from 'prosemirror-commands';
import Tools from '../../lib/Tools';
import { injectable } from 'inversify';
import { icons } from 'wax-prosemirror-components';

export default
@injectable()
class JoinUp extends Tools {
  title = 'Join with above block';
  content = icons.join_up;
  name = 'JoinUp';

  get run() {
    return joinUp;
  }

  get enable() {
    return joinUp;
  }

  select(state) {
    return joinUp(state);
  }
}

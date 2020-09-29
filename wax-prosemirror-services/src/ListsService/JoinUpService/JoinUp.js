import { joinUp } from 'prosemirror-commands';
import { injectable } from 'inversify';
import Tools from '../../lib/Tools';

export default
@injectable()
class JoinUp extends Tools {
  title = 'Join with above block';
  icon = 'arrowUp';
  name = 'JoinUp';

  get run() {
    return joinUp;
  }

  select(state) {
    return joinUp(state);
  }

  get enable() {
    return joinUp;
  }
}

import { injectable } from 'inversify';
import Tools from '../../lib/Tools';

export default
@injectable()
class AcceptTrackChange extends Tools {
  title = 'Accept Changes';
  content = 'Accept';

  get run() {
    return (state, dispatch) => {};
  }

  get active() {
    return state => {};
  }
}

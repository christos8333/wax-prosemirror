import { injectable } from 'inversify';
import Tools from '../../lib/Tools';

export default
@injectable()
class RejectTrackChange extends Tools {
  title = 'Reject Changes';
  content = 'Reject';

  get run() {
    return (state, dispatch) => {};
  }

  get active() {
    return state => {};
  }
}

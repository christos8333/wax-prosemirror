import { injectable } from 'inversify';
import Tools from '../../lib/Tools';

export default
@injectable()
class ShowHideTrackChange extends Tools {
  title = 'Show/Hide Changes';
  label = 'Accept';
  name = 'ShowHideTrackChange';

  get run() {
    return (state, dispatch) => {};
  }

  select = (state, activeViewId, activeView) => {
    return true;
  };

  get active() {
    return state => {};
  }
}

import { injectable } from 'inversify';
import Tools from '../../lib/Tools';

@injectable()
class ShowHideTrackChange extends Tools {
  title = 'Show/Hide Changes';
  icon = 'showTrack';
  label = 'Show Hide';
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

export default ShowHideTrackChange;

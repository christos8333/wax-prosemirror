import { injectable } from 'inversify';
import { Tools } from 'wax-prosemirror-core';

@injectable()
class ShowHideTrackChange extends Tools {
  title = 'Show/Hide Changes';
  icon = 'showTrack';
  label = 'Show suggestions';
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

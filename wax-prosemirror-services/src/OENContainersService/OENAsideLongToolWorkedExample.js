import { injectable } from 'inversify';
import Tools from '../lib/Tools';

@injectable()
export default class OENAsideLongToolWorkedExample extends Tools {
  title = 'long';
  label = 'Worked Example';
  name = 'OENAsideLongToolWorkedExample';

  get run() {
    return (state, dispatch, className) => {};
  }

  select = (state, activeViewId) => {
    if (activeViewId !== 'main') return false;
    return true;
  };

  get enable() {
    return state => {
      return true;
    };
  }

  get active() {
    return (state, OENToolsConfig) => {};
  }
}

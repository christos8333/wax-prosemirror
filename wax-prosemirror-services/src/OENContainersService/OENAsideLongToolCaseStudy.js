import { injectable } from 'inversify';
import Tools from '../lib/Tools';

@injectable()
export default class OENAsideLongToolCaseStudy extends Tools {
  title = 'long';
  label = 'Case Study';
  name = 'OENAsideLongToolCaseStudy';

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

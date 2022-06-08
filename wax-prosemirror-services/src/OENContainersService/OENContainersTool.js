import { injectable } from 'inversify';
import Tools from '../lib/Tools';

@injectable()
export default class OENContainersTool extends Tools {
  title = '';
  icon = '';
  name = '';

  get run() {
    return () => true;
  }

  select = (state, activeViewId) => {
    return true;
  };

  get enable() {
    return state => {
      return true;
    };
  }
}

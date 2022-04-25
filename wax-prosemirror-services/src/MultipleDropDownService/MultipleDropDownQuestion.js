import { injectable } from 'inversify';
import Tools from '../lib/Tools';

@injectable()
class FillTheGapQuestion extends Tools {
  title = 'Add Multiple Drop Down Question';
  icon = 'mulitpleDropDownQuestion';
  name = 'Multiple Drop Down';

  get run() {
    return (state, dispatch, view) => {};
  }

  get active() {
    return state => {};
  }

  select = (state, activeViewId, activeView) => {};

  get enable() {
    return state => {};
  }
}

export default FillTheGapQuestion;

import { injectable } from 'inversify';
import Tools from '../lib/Tools';

@injectable()
class MatchingQuestion extends Tools {
  title = 'Add Matching';
  label = 'Matching';
  name = 'Matching';

  get run() {
    return (state, dispatch) => {};
  }

  select = (state, activeViewId) => {};

  get active() {
    return state => {};
  }

  get enable() {
    return state => {};
  }
}
export default MatchingQuestion;

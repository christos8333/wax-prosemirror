import { injectable } from 'inversify';
import { Tools } from 'wax-prosemirror-services';

@injectable()
class MultipleChoiceQuestion extends Tools {
  title = 'Change to Multiple Choice';
  label = 'Multiple Choice';
  name = 'Multiple Choice';

  get run() {
    return (state, dispatch) => {};
  }

  get active() {
    return state => {};
  }

  select = (state, activeViewId) => {
    return true;
  };

  get enable() {
    return state => {};
  }
}

export default MultipleChoiceQuestion;

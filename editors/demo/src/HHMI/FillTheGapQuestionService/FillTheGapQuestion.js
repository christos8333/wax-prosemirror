import { injectable } from 'inversify';
import { Tools } from 'wax-prosemirror-services';

@injectable()
class FillTheGapQuestion extends Tools {
  title = 'Add Fill The Gap Question';
  label = 'Fill The Gap';
  name = 'Fill The Gap';

  get run() {
    return (view, context) => {};
  }

  get active() {
    return state => {};
  }

  select = (state, activeViewId) => {};

  get enable() {
    return state => {};
  }
}

export default FillTheGapQuestion;

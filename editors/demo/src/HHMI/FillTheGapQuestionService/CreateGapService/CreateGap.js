import { injectable } from 'inversify';
import { Tools } from 'wax-prosemirror-services';

@injectable()
class CreateGap extends Tools {
  title = 'Create Gap Option';
  label = 'Create Gap';
  name = 'Create Gap';

  get run() {
    return (state, dispatch) => {};
  }

  get active() {
    return state => {};
  }

  select = (state, activeViewId) => {};

  get enable() {
    return state => {};
  }
}

export default CreateGap;

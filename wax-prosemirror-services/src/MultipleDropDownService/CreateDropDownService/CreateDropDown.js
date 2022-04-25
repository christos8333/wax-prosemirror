import { injectable } from 'inversify';
import { Fragment } from 'prosemirror-model';
import { v4 as uuidv4 } from 'uuid';
import Tools from '../../lib/Tools';

@injectable()
class CreateDropDown extends Tools {
  title = 'Create Drop Down';
  icon = 'mulitpleDropDown';
  name = 'Create_Drop_Down';

  get run() {
    return (state, dispatch) => {};
  }

  select = (state, activeViewId, activeView) => {};

  get active() {
    return state => {};
  }

  get enable() {
    return state => {};
  }
}

export default CreateDropDown;

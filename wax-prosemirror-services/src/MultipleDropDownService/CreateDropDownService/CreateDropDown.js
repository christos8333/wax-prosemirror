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
    return (state, dispatch) => {
      const content = Fragment.empty;
      const createGap = state.config.schema.nodes.multiple_drop_down_option.create(
        { id: uuidv4() },
        content,
      );
      dispatch(state.tr.replaceSelectionWith(createGap));
    };
  }

  select = (state, activeViewId, activeView) => {
    return true;
  };

  get active() {
    return state => {};
  }

  get enable() {
    return state => {};
  }
}

export default CreateDropDown;

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
    let status = false;
    const { from, to } = state.selection;
    const { disallowedTools } = activeView.props;

    state.doc.nodesBetween(from, to, (node, pos) => {
      if (node.type.name === 'multiple_drop_down_container') {
        status = true;
      }
    });

    if (from === null || disallowedTools.includes('MultipleDropDown'))
      status = false;

    return status;
  };

  get active() {
    return state => {};
  }

  get enable() {
    return state => {};
  }
}

export default CreateDropDown;

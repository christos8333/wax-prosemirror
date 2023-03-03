import { injectable } from 'inversify';
import { Fragment } from 'prosemirror-model';
import { NodeSelection } from 'prosemirror-state';
import { v4 as uuidv4 } from 'uuid';
import { Tools } from 'wax-prosemirror-core';

@injectable()
class CreateDropDown extends Tools {
  title = 'Create Drop Down';
  icon = 'mulitpleDropDown';
  name = 'Create_Drop_Down';
  label = 'Insert Drop Down';

  get run() {
    return (state, dispatch) => {
      const content = Fragment.empty;
      const { tr } = state;
      const createGap = state.config.schema.nodes.multiple_drop_down_option.create(
        { id: uuidv4(), options: [] },
        content,
      );
      tr.replaceSelectionWith(createGap);
      const resolvedPos = tr.doc.resolve(
        tr.selection.anchor - tr.selection.$anchor.nodeBefore.nodeSize,
      );

      tr.setSelection(new NodeSelection(resolvedPos));
      dispatch(tr);
    };
  }

  select = (state, activeViewId, activeView) => {
    if (
      activeView.props.type &&
      activeView.props.type === 'MultipleDropDownContainer'
    )
      return true;

    return false;
  };

  get active() {
    return state => {};
  }

  get enable() {
    return state => {};
  }
}

export default CreateDropDown;

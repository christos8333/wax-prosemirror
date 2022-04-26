import { injectable } from 'inversify';
import { TextSelection } from 'prosemirror-state';
import { AddMarkStep } from 'prosemirror-transform';

import { v4 as uuidv4 } from 'uuid';
import Tools from '../../lib/Tools';

@injectable()
class CreateDropDown extends Tools {
  title = 'Create Drop Down';
  icon = 'mulitpleDropDown';
  name = 'Create_Drop_Down';

  get run() {
    return (state, dispatch) => {
      const {
        tr,
        selection: { from, to },
      } = state;

      console.log(tr);
      tr.insertText('hi');

      const selectionFrom = new TextSelection(state.doc.resolve(from));

      const selectionTo = new TextSelection(state.doc.resolve(to + 2));

      console.log(selectionFrom.$anchor, selectionTo.$head);

      state.tr.setSelection(
        TextSelection.between(selectionFrom.$anchor, selectionTo.$head),
      );

      tr.step(
        new AddMarkStep(
          from,
          to + 2,
          state.config.schema.marks.multiple_drop_down_option.create({
            id: uuidv4(),
            class: 'multiple-drop-down-option',
          }),
        ),
      );

      dispatch(tr);
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

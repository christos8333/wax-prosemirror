import { injectable } from 'inversify';
import { Fragment } from 'prosemirror-model';
import { v4 as uuidv4 } from 'uuid';
import { Tools } from 'wax-prosemirror-services';

@injectable()
class CreateGap extends Tools {
  title = 'Create Gap Option';
  icon = 'insertGap';
  name = 'Create Gap';

  get run() {
    return (state, dispatch) => {
      const { empty, $from, $to } = state.selection;
      let content = Fragment.empty;
      if (!empty && $from.sameParent($to) && $from.parent.inlineContent)
        content = $from.parent.content.cut(
          $from.parentOffset,
          $to.parentOffset,
        );
      const createGap = state.config.schema.nodes.fill_the_gap.create(
        { id: uuidv4() },
        content,
      );
      dispatch(state.tr.replaceSelectionWith(createGap));
    };
  }

  select = (state, activeViewId) => {
    let status = false;
    const { from, to } = state.selection;
    state.doc.nodesBetween(from, to, (node, pos) => {
      if (node.type.name === 'fill_the_gap_container') {
        status = true;
      }
    });
    return status;
  };

  get active() {
    return state => {};
  }

  get enable() {
    return state => {};
  }
}

export default CreateGap;

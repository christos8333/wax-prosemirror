import { injectable } from 'inversify';
import { Fragment } from 'prosemirror-model';
import { v4 as uuidv4 } from 'uuid';
import { Tools } from 'wax-prosemirror-core';

@injectable()
class CreateGap extends Tools {
  title = 'Create Gap Option';
  icon = 'insertGap';
  name = 'Create Gap';
  label = 'Create Gap';

  get run() {
    return (state, dispatch, activeView, context) => {
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
      setTimeout(() => {
        context.pmViews[createGap.attrs.id].focus();
      }, 100);
    };
  }

  select = (state, activeViewId, activeView) => {
    if (activeView.props.type && activeView.props.type === 'filltheGapContaier')
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

export default CreateGap;

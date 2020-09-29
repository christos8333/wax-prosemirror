import Tools from '../lib/Tools';
import { injectable } from 'inversify';
import { Fragment } from 'prosemirror-model';
import { v4 as uuidv4 } from 'uuid';

export default
@injectable()
class Note extends Tools {
  title = 'Insert Note';
  icon = 'note';
  name = 'Note';

  get run() {
    return (state, dispatch) => {
      const { empty, $from, $to } = state.selection;
      let content = Fragment.empty;
      if (!empty && $from.sameParent($to) && $from.parent.inlineContent)
        content = $from.parent.content.cut(
          $from.parentOffset,
          $to.parentOffset,
        );
      const footnote = state.config.schema.nodes.footnote.create(
        { id: uuidv4() },
        content,
      );
      dispatch(state.tr.replaceSelectionWith(footnote));
    };
  }

  select = (state, activeViewId) => {
    if (activeViewId !== 'main') return false;
    return true;
  };

  get enable() {
    return state => {
      return false;
    };
  }
}

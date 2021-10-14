import { injectable } from 'inversify';
import { wrapIn } from 'prosemirror-commands';
import { Tools } from 'wax-prosemirror-services';

@injectable()
class FillTheGapQuestion extends Tools {
  title = 'Add Fill The Gap Question';
  icon = 'gapQuestion';
  name = 'Fill The Gap';

  get run() {
    return (state, dispatch) => {
      wrapIn(state.config.schema.nodes.fill_the_gap_container)(state, dispatch);
    };
  }

  get active() {
    return state => {};
  }

  select = (state, activeViewId) => {
    let status = true;
    const { from, to } = state.selection;
    state.doc.nodesBetween(from, to, (node, pos) => {
      if (node.type.name === 'fill_the_gap_container') {
        status = false;
      }
    });
    return status;
  };

  get enable() {
    return state => {};
  }
}

export default FillTheGapQuestion;

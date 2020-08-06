import { injectable } from 'inversify';
import Tools from '../../lib/Tools';

export default
@injectable()
class AcceptTrackChange extends Tools {
  title = 'Accept Changes';
  content = 'Accept';

  get run() {
    return (state, dispatch) => {
      const {
        selection: { from, to },
      } = state;

      state.doc.nodesBetween(from, to, (node, pos) => {
        if (
          node.marks &&
          node.marks.find(mark => mark.type.name === 'insertion')
        ) {
          const insertionMark = node.marks.find(
            mark => mark.type.name === 'insertion',
          );
          dispatch(
            state.tr.removeMark(
              insertionMark.pos,
              insertionMark.pos + node.nodeSize,
              state.schema.marks.insertion,
            ),
          );
        }
      });
    };
  }

  get active() {
    return state => {};
  }
}

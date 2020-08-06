import { Mapping, RemoveMarkStep, ReplaceStep } from 'prosemirror-transform';
import { Slice } from 'prosemirror-model';
import { injectable } from 'inversify';
import Tools from '../../lib/Tools';

export default
@injectable()
class RejectTrackChange extends Tools {
  title = 'Reject Changes';
  content = 'Reject';

  get run() {
    return (state, dispatch) => {
      const {
        tr,
        selection: { from, to },
      } = state;
      tr.setMeta('AcceptReject', true);
      const map = new Mapping();

      state.doc.nodesBetween(from, to, (node, pos) => {
        if (
          node.marks &&
          node.marks.find(mark => mark.type.name === 'deletion')
        ) {
          const deletionMark = node.marks.find(
            mark => mark.type.name === 'deletion',
          );
          tr.step(
            new RemoveMarkStep(
              map.map(Math.max(pos, from)),
              map.map(Math.min(pos + node.nodeSize, to)),
              deletionMark,
            ),
          );
        } else if (
          node.marks &&
          node.marks.find(mark => mark.type.name === 'insertion')
        ) {
          const deletionStep = new ReplaceStep(
            map.map(Math.max(pos, from)),
            map.map(Math.min(pos + node.nodeSize, to)),
            Slice.empty,
          );
          tr.step(deletionStep);
          map.appendMap(deletionStep.getMap());
        }
      });
      if (tr.steps.length) dispatch(tr);
    };
  }

  get active() {
    return state => {};
  }
}

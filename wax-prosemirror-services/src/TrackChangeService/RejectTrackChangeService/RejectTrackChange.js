import {
  Mapping,
  RemoveMarkStep,
  ReplaceStep,
  AddMarkStep,
} from 'prosemirror-transform';
import { Slice } from 'prosemirror-model';
import { injectable } from 'inversify';
import removeNode from '../track-changes/helpers/removeNode';
import Tools from '../../lib/Tools';

export default
@injectable()
class RejectTrackChange extends Tools {
  title = 'Reject Changes';
  content = 'Reject';
  name = 'RejectTrackChange';

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
          node.attrs.track &&
          node.attrs.track.find(track => track.type === 'insertion')
        ) {
          removeNode(tr, node, pos, map);
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
        } else if (
          node.marks &&
          node.marks.find(mark => mark.type.name === 'format_change')
        ) {
          const formatChangeMark = node.marks.find(
            mark => mark.type.name === 'format_change',
          );
          formatChangeMark.attrs.before.forEach(oldMark => {
            tr.step(
              new AddMarkStep(
                map.map(Math.max(pos, from)),
                map.map(Math.min(pos + node.nodeSize, to)),
                state.schema.marks[oldMark].create(),
              ),
            );
          });
          formatChangeMark.attrs.after.forEach(newMark => {
            tr.step(
              new RemoveMarkStep(
                map.map(Math.max(pos, from)),
                map.map(Math.min(pos + node.nodeSize, to)),
                node.marks.find(mark => mark.type.name === newMark),
              ),
            );
          });

          tr.step(
            new RemoveMarkStep(
              map.map(Math.max(pos, from)),
              map.map(Math.min(pos + node.nodeSize, to)),
              formatChangeMark,
            ),
          );
        }
      });
      if (tr.steps.length) dispatch(tr);
    };
  }

  select = (state, activeViewId) => {
    const {
      selection: { from, to },
    } = state;
    if (from === to && activeViewId !== 'main') return false;
    return true;
  };

  get active() {
    return state => {};
  }
}

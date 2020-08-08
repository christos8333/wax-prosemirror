import { Mapping, RemoveMarkStep, ReplaceStep } from 'prosemirror-transform';
import { Slice } from 'prosemirror-model';
import { injectable } from 'inversify';
import removeNode from '../track-changes/helpers/removeNode';
import Tools from '../../lib/Tools';

export default
@injectable()
class AcceptTrackChange extends Tools {
  title = 'Accept Changes';
  content = 'Accept';

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
          node.attrs.track &&
          node.attrs.track.find(track => track.type === 'deletion')
        ) {
          removeNode(tr, node, pos, map);
        }
        if (
          node.marks &&
          node.marks.find(mark => mark.type.name === 'deletion')
        ) {
          const deletionStep = new ReplaceStep(
            map.map(Math.max(pos, from)),
            map.map(Math.min(pos + node.nodeSize, to)),
            Slice.empty,
          );
          tr.step(deletionStep);
          map.appendMap(deletionStep.getMap());
        } else if (
          node.attrs.track &&
          node.attrs.track.find(track => track.type === 'insertion')
        ) {
          const track = node.attrs.track.filter(
            track => track.type !== 'insertion',
          );
          tr.setNodeMarkup(
            map.map(pos),
            null,
            Object.assign(node.attrs.track, { track }),
            node.marks,
          );
        } else if (
          node.marks &&
          node.marks.find(mark => mark.type.name === 'insertion')
        ) {
          const insertionMark = node.marks.find(
            mark => mark.type.name === 'insertion',
          );
          tr.step(
            new RemoveMarkStep(
              map.map(Math.max(pos, from)),
              map.map(Math.min(pos + node.nodeSize, to)),
              insertionMark,
            ),
          );
        } else if (
          node.marks &&
          node.marks.find(mark => mark.type.name === 'format_change')
        ) {
          const formatChangeMark = node.marks.find(
            mark => mark.type.name === 'format_change',
          );
          tr.step(
            new RemoveMarkStep(
              map.map(Math.max(pos, from)),
              map.map(Math.min(pos + node.nodeSize, to)),
              formatChangeMark,
            ),
          );
        } else if (
          node.attrs.track &&
          node.attrs.track.find(track => track.type === 'block_change')
        ) {
          const blockChangeTrack = node.attrs.track.find(
            track => track.type === 'block_change',
          );

          const track = node.attrs.track.filter(
            track => track !== blockChangeTrack,
          );

          tr.setNodeMarkup(
            map.map(pos),
            null,
            Object.assign(node.attrs.track, { track }),
            node.marks,
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

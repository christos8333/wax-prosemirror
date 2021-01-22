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

const checkFromConfig = (mark, user, config) => {
  if (mark.attrs.username === user.username && !config.own.accept) {
    return false;
  }

  if (mark.attrs.username !== user.username && !config.others.accept) {
    return false;
  }

  return true;
};

@injectable()
class RejectTrackChange extends Tools {
  title = 'Reject Changes';
  label = 'Reject in selection';
  icon = 'rejectTrack';
  name = 'RejectTrackChange';

  get run() {
    return (state, dispatch, user) => {
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
        } else if (!node.isInline && node.attrs.track) {
          const blockChangeTrack = node.attrs.track.find(
            track => track.type === 'block_change',
          );
          if (blockChangeTrack) {
            const track = node.attrs.track.filter(
              track => track !== blockChangeTrack,
            );
            tr.setNodeMarkup(
              map.map(pos),
              state.schema.nodes[blockChangeTrack.before.type],
              Object.assign({}, node.attrs, blockChangeTrack.before.attrs, {
                track,
              }),
              node.marks,
            );
          }
        }
      });
      if (tr.steps.length) dispatch(tr);
    };
  }

  select = (state, activeViewId, activeView) => {
    const {
      selection: { from, to },
    } = activeView.state;
    if (from === to && activeViewId !== 'main') return false;
    return true;
  };

  get active() {
    return state => {};
  }
}

export default RejectTrackChange;

import {
  Mapping,
  RemoveMarkStep,
  ReplaceStep,
  AddMarkStep,
} from 'prosemirror-transform';
import { Slice } from 'prosemirror-model';
import removeNode from './removeNode';

const checkFromConfig = (mark, user, config) => {
  if (mark.attrs.username === user.username && !config.own.reject) {
    return false;
  }

  if (mark.attrs.username !== user.username && !config.others.reject) {
    return false;
  }

  return true;
};

const rejectTrackChange = (
  dispatch,
  user,
  activeTrackChange,
  rejectConfig,
  context,
  trackData,
) => {
  const { activeView } = context;
  const { state } = activeView;
  const {
    tr,
    selection: { from },
  } = state;

  let { to } = activeTrackChange;

  if (trackData?.node?.type?.name === 'figure') {
    to = activeTrackChange.from + 3;
  }
  console.log(activeTrackChange, trackData);
  tr.setMeta('AcceptReject', true);
  const map = new Mapping();

  state.doc.nodesBetween(activeTrackChange.from, to, (node, pos) => {
    if (node.marks && node.marks.find(mark => mark.type.name === 'deletion')) {
      const deletionMark = node.marks.find(
        mark => mark.type.name === 'deletion',
      );
      const configCheck = checkFromConfig(deletionMark, user, rejectConfig);
      if (!configCheck) return;

      tr.step(
        new RemoveMarkStep(
          map.map(Math.max(pos, from)),
          map.map(Math.min(pos + node.nodeSize, to)),
          deletionMark,
        ),
      );
    }
    if (
      node.attrs.track &&
      node.attrs.track.find(track => track.type === 'insertion')
    ) {
      removeNode(tr, node, pos, map);
    } else if (
      node.attrs.track &&
      node.attrs.track.find(track => track.type === 'deletion')
    ) {
      console.log('remove track attrs');
    }
    if (node.marks && node.marks.find(mark => mark.type.name === 'insertion')) {
      const insertionMark = node.marks.find(
        mark => mark.type.name === 'insertion',
      );

      const configCheck = checkFromConfig(insertionMark, user, rejectConfig);
      if (!configCheck) return;

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
            activeTrackChange.from,
            activeTrackChange.to,
            state.schema.marks[oldMark].create(),
          ),
        );
      });
      formatChangeMark.attrs.after.forEach(newMark => {
        tr.step(
          new RemoveMarkStep(
            activeTrackChange.from,
            activeTrackChange.to,
            node.marks.find(mark => mark.type.name === newMark),
          ),
        );
      });

      tr.step(
        new RemoveMarkStep(
          activeTrackChange.from,
          activeTrackChange.to,
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

export default rejectTrackChange;

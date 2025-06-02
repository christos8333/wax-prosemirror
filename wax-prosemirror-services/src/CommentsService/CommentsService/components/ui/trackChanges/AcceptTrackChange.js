import { Mapping, RemoveMarkStep, ReplaceStep } from 'prosemirror-transform';
import { Slice } from 'prosemirror-model';
import removeNode from './removeNode';

const checkFromConfig = (mark, user, config) => {
  if (mark.attrs.username === user.username && !config.own.accept) {
    return false;
  }

  if (mark.attrs.username !== user.username && !config.others.accept) {
    return false;
  }

  return true;
};

const acceptTrackChange = (
  dispatch,
  user,
  activeTrackChange,
  acceptConfig,
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
  } else if (activeTrackChange.from === to) {
    to += 1;
  }

  tr.setMeta('AcceptReject', true);
  const map = new Mapping();

  state.doc.nodesBetween(activeTrackChange.from, to, (node, pos) => {
    if (
      node.attrs.track &&
      node.attrs.track.find(track => track.type === 'deletion')
    ) {
      removeNode(tr, node, pos, map);
    }
    if (node.marks && node.marks.find(mark => mark.type.name === 'deletion')) {
      const deletionMark = node.marks.find(
        mark => mark.type.name === 'deletion',
      );

      const configCheck = checkFromConfig(deletionMark, user, acceptConfig);
      if (!configCheck) return;

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
      const configCheck = checkFromConfig(insertionMark, user, acceptConfig);
      if (!configCheck) return;

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
      const configCheck = checkFromConfig(formatChangeMark, user, acceptConfig);
      if (!configCheck) return;

      tr.step(
        new RemoveMarkStep(
          activeTrackChange.from,
          activeTrackChange.to,
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
        {
          class: node.attrs.class,
          track: [],
        },
        // Object.assign(node.attrs.track, { track }),
        node.marks,
      );
    }
  });
  if (tr.steps.length) dispatch(tr);
};

export default acceptTrackChange;

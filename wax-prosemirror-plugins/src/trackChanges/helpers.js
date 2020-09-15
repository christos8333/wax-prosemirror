import { Decoration, DecorationSet } from 'prosemirror-view';

import {
  key,
  selectedInsertionSpec,
  selectedDeletionSpec,
  selectedChangeFormatSpec,
  selectedChangeBlockSpec,
} from './TrackChangePlugin';

export function getSelectedChanges(state) {
  const { decos } = key.getState(state);

  const insertion = decos.find(
    undefined,
    undefined,
    spec => spec === selectedInsertionSpec,
  )[0];
  const deletion = decos.find(
    undefined,
    undefined,
    spec => spec === selectedDeletionSpec,
  )[0];
  const format_change = decos.find(
    undefined,
    undefined,
    spec => spec === selectedChangeFormatSpec,
  )[0];
  const block_change = decos.find(
    undefined,
    undefined,
    spec => spec === selectedChangeBlockSpec,
  )[0];

  return { insertion, deletion, format_change, block_change };
}

export function setSelectedChanges(state, type, pos) {
  const { tr } = state;
  const node = tr.doc.nodeAt(pos);
  const mark = node.attrs.track
    ? node.attrs.track.find(trackAttr => trackAttr.type === type)
    : node.marks.find(mark => mark.type.name === type);
  if (!mark) {
    return;
  }
  const selectedChange = node.isInline
    ? getFromToMark(tr.doc, pos, mark)
    : { from: pos, to: pos + node.nodeSize };
  let decos = DecorationSet.empty;
  let spec;
  if (type === 'insertion') {
    spec = selectedInsertionSpec;
  } else if (type === 'deletion') {
    spec = selectedDeletionSpec;
  } else if (type === 'format_change') {
    spec = selectedChangeFormatSpec;
  } else if (type === 'block_change') {
    spec = selectedChangeBlockSpec;
  }
  const decoType = node.isInline ? Decoration.inline : Decoration.node;
  decos = decos.add(tr.doc, [
    decoType(
      selectedChange.from,
      selectedChange.to,
      {
        class: `selected-${type}`,
      },
      spec,
    ),
  ]);
  tr.setMeta(key, { decos }).setMeta('track', true);
}

export function deactivateAllSelectedChanges(tr) {
  const pluginState = {
    decos: DecorationSet.empty,
  };
  return tr.setMeta(key, pluginState).setMeta('track', true);
}

// From https://discuss.prosemirror.net/t/expanding-the-selection-to-the-active-mark/478/2 with some bugs fixed
export function getFromToMark(doc, pos, mark) {
  const $pos = doc.resolve(pos);
  const { parent } = $pos;
  const start = parent.childAfter($pos.parentOffset);
  if (!start.node) {
    return null;
  }
  let startIndex = $pos.index();
  let startPos = $pos.start() + start.offset;
  while (startIndex > 0 && mark.isInSet(parent.child(startIndex - 1).marks)) {
    startPos -= parent.child(--startIndex).nodeSize;
  }
  let endIndex = $pos.index() + 1;
  let endPos = $pos.start() + start.offset + start.node.nodeSize;
  while (
    endIndex < parent.childCount &&
    mark.isInSet(parent.child(endIndex).marks)
  ) {
    endPos += parent.child(endIndex++).nodeSize;
  }
  return { from: startPos, to: endPos };
}

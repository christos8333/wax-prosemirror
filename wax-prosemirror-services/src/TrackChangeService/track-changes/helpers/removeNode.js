import {
  ReplaceStep,
  ReplaceAroundStep,
  replaceStep,
} from 'prosemirror-transform';
import { Slice } from 'prosemirror-model';
import { Selection, TextSelection, EditorState } from 'prosemirror-state';
import { liftListItem } from 'prosemirror-schema-list';

const removeNode = (tr, node, nodePos, map, accept) => {
  const newNodePos = map.map(nodePos);
  const selectionBefore = Selection.findFrom(tr.doc.resolve(newNodePos), -1);
  const start = selectionBefore.$anchor.pos;
  const end = newNodePos + 1;

  const delStep = replaceStep(tr.doc, start, end);

  tr.step(delStep);
  const stepMap = delStep.getMap();
  map.appendMap(stepMap);
};

export default removeNode;

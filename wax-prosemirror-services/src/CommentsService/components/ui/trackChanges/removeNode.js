import { replaceStep } from 'prosemirror-transform';
import { Selection } from 'prosemirror-state';

const removeNode = (tr, node, nodePos, map) => {
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

import { replaceStep, ReplaceStep } from 'prosemirror-transform';
import { Slice } from 'prosemirror-model';
import { Selection } from 'prosemirror-state';

const removeNode = (tr, node, nodePos, map) => {
  const newNodePos = map.map(nodePos);
  let delStep;
  const selectionBefore = Selection.findFrom(tr.doc.resolve(newNodePos), -1);
  const start = selectionBefore.$anchor.pos;
  const end = newNodePos + 1;

  if (node.isLeaf || ['figure', 'table'].includes(node.type.name)) {
    delStep = new ReplaceStep(
      newNodePos,
      map.map(nodePos + node.nodeSize),
      Slice.empty,
    );
  } else {
    delStep = replaceStep(tr.doc, start, end);
  }

  tr.step(delStep);
  const stepMap = delStep.getMap();
  map.appendMap(stepMap);
};

export default removeNode;

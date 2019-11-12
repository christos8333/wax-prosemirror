import ReactDOM from "react-dom";
import React from "react";
import { EditorState, Plugin, PluginKey } from "prosemirror-state";
import { TextSelection } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

const Component = ({ state }) => {
  return <div>{state.selection.from}</div>;
};

const findNodesWithSameMark = (doc, from, to, markType) => {
  let ii = from;
  const finder = mark => mark.type === markType;
  let firstMark = null;
  let fromNode = null;
  let toNode = null;

  while (ii <= to) {
    const node = doc.nodeAt(ii);
    if (!node || !node.marks) {
      return null;
    }
    const mark = node.marks.find(finder);
    if (!mark) {
      return null;
    }
    if (firstMark && mark !== firstMark) {
      return null;
    }
    fromNode = fromNode || node;
    firstMark = firstMark || mark;
    toNode = node;
    ii++;
  }

  let fromPos = from;
  let toPos = to;

  let jj = 0;
  ii = from - 1;
  while (ii > jj) {
    const node = doc.nodeAt(ii);
    const mark = node && node.marks.find(finder);
    if (!mark || mark !== firstMark) {
      break;
    }
    fromPos = ii;
    fromNode = node;
    ii--;
  }

  ii = to + 1;
  jj = doc.nodeSize - 2;
  while (ii < jj) {
    const node = doc.nodeAt(ii);
    const mark = node && node.marks.find(finder);
    if (!mark || mark !== firstMark) {
      break;
    }
    toPos = ii;
    toNode = node;
    ii++;
  }

  return {
    mark: firstMark,
    from: {
      node: fromNode,
      pos: fromPos
    },
    to: {
      node: toNode,
      pos: toPos
    }
  };
};

const WithStatePLugin = Component => ({ state }) => {
  const { doc, selection, schema } = state;
  const markType = schema.marks.strong;
  if (!markType) {
    return null;
  }
  const { from, to } = selection;
  const result = findNodesWithSameMark(doc, from, to, markType);
  return result ? <Component state={state} /> : null;
};

export const FindAndReplaceKey = new PluginKey("findandreplace");

const FindAndReplacePlugin = new Plugin({
  key: FindAndReplaceKey,
  state: {
    init() {
      return { show: false, component: WithStatePLugin(Component) };
    },
    apply(tr, oldState, newState) {
      return this.getState(newState);
    }
  }
});

export default FindAndReplacePlugin;

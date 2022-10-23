import { injectable } from 'inversify';
import { keymap } from 'prosemirror-keymap';
import { undo, redo } from 'prosemirror-history';
import { splitListItem } from 'prosemirror-schema-list';
import { NodeSelection, TextSelection } from 'prosemirror-state';
import {
  baseKeymap,
  chainCommands,
  exitCode,
  selectParentNode,
  joinBackward,
  selectNodeBackward,
  deleteSelection,
} from 'prosemirror-commands';
import Commands from '../../../utilities/commands/Commands';
import DocumentHelpers from '../../../utilities/document/DocumentHelpers';

const backSpace = chainCommands(
  deleteSelection,
  joinBackward,
  selectNodeBackward,
);

const backSpaceShortCut = (state, dispatch, view) => {
  const { $from, $to } = state.selection;
  const { nodeBefore } = $from;

  if (nodeBefore && nodeBefore.type.name === 'math_inline') {
    const index = $from.index($from.depth);
    const $beforePos = state.doc.resolve($from.posAtIndex(index - 1));

    dispatch(state.tr.setSelection(new NodeSelection($beforePos)));

    return true;
  }

  state.doc.nodesBetween($from.pos, $to.pos, (node, from) => {
    if (node.type.name === 'fill_the_gap_container') {
      const index = $from.index($from.depth);
      const $beforePos = state.doc.resolve($from.posAtIndex(index - 1));
      dispatch(state.tr.setSelection(new NodeSelection($beforePos)));
    }
  });

  state.doc.nodesBetween($from.pos, $to.pos, (node, from) => {
    if (node.type.name === 'math_display') {
      const $start = state.tr.doc.resolve(state.tr.selection.$anchor.start());
      const $end = state.tr.doc.resolve(state.tr.selection.$anchor.end());

      dispatch(state.tr.setSelection(new TextSelection($start, $end)));
    }
  });

  return backSpace(
    state,
    tr => dispatch(tr.setMeta('inputType', 'backwardsDelete')),
    view,
  );
};

const pressEnter = (state, dispatch) => {
  if (state.selection.node && state.selection.node.type.name === 'image') {
    const { $from, to } = state.selection;

    const same = $from.sharedDepth(to);

    const pos = $from.before(same);
    dispatch(state.tr.setSelection(NodeSelection.create(state.doc, pos)));
    return true;
  }
  // LISTS
  if (splitListItem(state.schema.nodes.list_item)(state)) {
    splitListItem(state.schema.nodes.list_item)(state, dispatch);
    return true;
  }
  // Title
  if (!Commands.setBlockType(state.config.schema.nodes.title)(state)) {
    const title = DocumentHelpers.findChildrenByType(
      state.doc,
      state.config.schema.nodes.title,
      true,
    );
    if (
      title.length === 1 &&
      state.selection.from === title[0].node.nodeSize - 1
    ) {
      return false;
    }
    if (
      title.length === 1 &&
      state.selection.ranges[0].$from.parent.type.name === 'title'
    ) {
      return true;
    }
  }

  return false;
};

const undoShortCut = (state, dispatch, view) =>
  undo(state, tr => dispatch(tr.setMeta('inputType', 'Undo')), view);

const redoShortCut = (state, dispatch, view) =>
  redo(state, tr => dispatch(tr.setMeta('inputType', 'Redo')), view);

const insertBreak = (state, dispatch) => {
  const br = state.schema.nodes.hard_break.create();
  dispatch(state.tr.replaceSelectionWith(br).scrollIntoView());
  return true;
};

// const insertRule = (state, dispatch) => {
//   const hr = this.schema.nodes.horizontal_rule.create();
//   dispatch(state.tr.replaceSelectionWith(hr).scrollIntoView());
//   return true;
// }

const getKeys = {
  'Mod-z': undoShortCut,
  'Shift-Mod-z': redoShortCut,
  Backspace: backSpaceShortCut,
  'Mod-y': redoShortCut,
  Escape: selectParentNode,
  'Mod-Enter': chainCommands(exitCode, insertBreak),
  'Shift-Enter': chainCommands(exitCode, insertBreak),
  'Ctrl-Enter': chainCommands(exitCode, insertBreak),
  // 'Mod-_': this.insertRule,
  Enter: pressEnter,
};

@injectable()
export default class ShortCuts {
  keys = getKeys;

  createShortCuts() {
    return keymap(this.createKeyBindings());
  }

  addShortCut(shortcut) {
    Object.assign(this.keys, shortcut);
  }

  createKeyBindings() {
    Object.keys(baseKeymap).forEach(key => {
      if (this.keys[key]) {
        this.keys[key] = chainCommands(this.keys[key], baseKeymap[key]);
      } else {
        this.keys[key] = baseKeymap[key];
      }
    });
    return this.keys;
  }
}

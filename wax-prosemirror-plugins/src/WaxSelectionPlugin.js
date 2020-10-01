import { Decoration, DecorationSet } from 'prosemirror-view';
import { Plugin } from 'prosemirror-state';

const WaxSelectionPlugin = new Plugin({
  state: {
    init(config, instance) {
      return { deco: DecorationSet.empty };
    },
    apply(transaction, state, prevEditorState, editorState) {
      const sel = transaction.curSelection;

      const decos = [
        Decoration.inline(sel.$from.pos, sel.$to.pos, {
          class: 'wax-selection-marker',
        }),
      ];
      const deco = DecorationSet.create(editorState.doc, decos);
      return { deco };
    },
  },
  props: {
    decorations(state) {
      if (state && this.getState(state)) {
        return this.getState(state).deco;
      }
      return null;
    },
  },
});

export default WaxSelectionPlugin;

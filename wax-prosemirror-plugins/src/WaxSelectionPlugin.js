import { Decoration, DecorationSet } from 'prosemirror-view';
import { Plugin, PluginKey } from 'prosemirror-state';

const waxSelectionPlugin = new PluginKey('waxSelectionPlugin');

const WaxSelectionPlugin = new Plugin({
  key: waxSelectionPlugin,
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

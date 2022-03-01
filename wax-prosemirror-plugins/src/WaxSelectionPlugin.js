import { Decoration, DecorationSet } from 'prosemirror-view';
import { Plugin, PluginKey } from 'prosemirror-state';

const waxSelectionPlugin = new PluginKey('waxSelectionPlugin');

const WaxSelectionPlugin = new Plugin({
  key: waxSelectionPlugin,
  state: {
    init(config, instance) {
      return { deco: DecorationSet.empty };
    },
    apply(tr, prev, previousState, newState) {
      const { selection } = tr;
      const createDecoration = DecorationSet.create(newState.doc, [
        Decoration.inline(selection.$from.pos, selection.$to.pos, {
          class: 'wax-selection-marker',
        }),
      ]);
      return { createDecoration };
    },
  },
  props: {
    decorations(state) {
      const waxSelectionPluginState =
        state && waxSelectionPlugin.getState(state);
      return waxSelectionPluginState.createDecoration;
    },
  },
});

export default WaxSelectionPlugin;

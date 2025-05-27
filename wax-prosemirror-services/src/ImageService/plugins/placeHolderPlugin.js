/* eslint-disable no-param-reassign */
import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

export default key =>
  new Plugin({
    key: new PluginKey(key),
    state: {
      init: function init() {
        return DecorationSet.empty;
      },
      apply: function apply(tr, set, oldState, newState) {
        // Adjust decoration positions to changes made by the transaction
        set = set.map(tr.mapping, tr.doc);

        // See if the transaction adds or removes any placeholders
        const action = tr.getMeta(this);

        if (action && action.add) {
          const widget = document.createElement('placeholder');

          const deco = Decoration.widget(action.add.pos, widget, {
            id: action.add.id,
            // Make the decoration inclusive so it doesn't get deleted when typing around it
            side: 1,
            marks: [],
          });
          set = set.add(tr.doc, [deco]);
        } else if (action && action.remove) {
          // More robust removal - find all decorations with the matching ID
          const toRemove = set.find(
            null,
            null,
            spec => spec.id === action.remove.id,
          );
          if (toRemove.length > 0) {
            set = set.remove(toRemove);
          }

          // Additional cleanup - sometimes decorations can persist
          const allDecorations = set.find();
          const persistentDecorations = allDecorations.filter(
            deco => deco.spec && deco.spec.id === action.remove.id,
          );
          if (persistentDecorations.length > 0) {
            set = set.remove(persistentDecorations);
          }
        }

        return set;
      },
    },
    props: {
      decorations: function decorations(state) {
        return this.getState(state);
      },
    },
  });

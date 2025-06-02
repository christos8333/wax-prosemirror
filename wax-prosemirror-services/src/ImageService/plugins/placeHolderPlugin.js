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
      apply: function apply(tr, set) {
        // Adjust decoration positions to changes made by the transaction
        set = set.map(tr.mapping, tr.doc);
        // See if the transaction adds or removes any placeholders
        const action = tr.getMeta(this);
        if (action && action.add) {
          const widget = document.createElement('placeholder');
          const deco = Decoration.widget(action.add.pos, widget, {
            id: action.add.id,
          });

          set = set.add(tr.doc, [deco]);
        } else if (action && action.remove) {
          set = set.remove(
            set.find(null, null, spec => spec.id === action.remove.id),
          );

          // HACK to fix
          // if (set?.find().length >= 1) {
          //   set = set.remove(set.find()[0])
          //   set.children = []
          // }
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

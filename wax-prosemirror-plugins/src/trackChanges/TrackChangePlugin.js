import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

import findSelectedChanges from './FindSelectedChanges';

export const key = new PluginKey('track');

export default options => {
  return new Plugin({
    key,
    state: {
      init(config, state) {
        return {
          decos: DecorationSet.empty,
        };
      },
      apply(tr, prev, oldState, state) {
        const meta = tr.getMeta(key);
        if (meta) {
          return meta;
        }

        const {
          selection: { from, to },
        } = state;

        let { decos } = this.getState(oldState);

        if (tr.selectionSet) {
          const { insertion, deletion, formatChange } = findSelectedChanges(
            state,
          );
          decos = DecorationSet.empty;
          const decoType = tr.selection.node
            ? Decoration.node
            : Decoration.inline;

          state.doc.nodesBetween(from, to, (node, pos) => {
            if (
              node.attrs.track &&
              node.attrs.track.find(track => track.type === 'block_change')
            ) {
              const blockChangeTrack = node.attrs.track.find(
                track => track.type === 'block_change',
              );
              console.log(state.selection, blockChangeTrack, node);
              decos = decos.add(tr.doc, [
                decoType(1, 100, {
                  class: 'selected-block_change',
                }),
              ]);
            }
          });

          if (insertion) {
            decos = decos.add(tr.doc, [
              decoType(insertion.from, insertion.to, {
                class: 'selected-insertion',
              }),
            ]);
          }
          if (deletion) {
            decos = decos.add(tr.doc, [
              decoType(deletion.from, deletion.to, {
                class: 'selected-deletion',
              }),
            ]);
          }
          if (formatChange) {
            decos = decos.add(tr.doc, [
              decoType(formatChange.from, formatChange.to, {
                class: 'selected-format-change',
              }),
            ]);
          }
        } else {
          decos = decos.map(tr.mapping, tr.doc);
        }
        return {
          decos,
        };
      },
    },
    props: {
      decorations(state) {
        const { decos } = this.getState(state);
        return decos;
      },
      handleDOMEvents: {
        focus: (view, _event) => {
          // view.dispatch(deactivateAllSelectedChanges(view.state.tr));
        },
      },
    },
  });
};

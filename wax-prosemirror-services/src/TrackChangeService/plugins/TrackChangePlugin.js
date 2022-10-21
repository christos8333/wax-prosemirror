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
        let currentTrackSelected;
        decos = DecorationSet.empty;
        if (tr.selectionSet) {
          const { insertion, deletion, formatChange } = findSelectedChanges(
            state,
          );

          const decoType = tr.selection.node
            ? Decoration.node
            : Decoration.inline;

          state.doc.nodesBetween(from, to, (node, pos) => {
            if (
              node.attrs.track &&
              node.attrs.track.find(track => track.type === 'block_change')
            ) {
              let nodeSize = pos;
              node.descendants((childNode, childPos) => {
                nodeSize += childNode.nodeSize;
              });
              // Active block
              node.attrs.track[0].id = node.attrs.id;
              currentTrackSelected = {
                from: pos,
                to: nodeSize,
                attrs: node.attrs.track[0],
              };
              decos = decos.add(tr.doc, [
                decoType(pos, nodeSize, {
                  class: 'selected-block-change',
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
            if (from === to) currentTrackSelected = formatChange;
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
          trackChange: currentTrackSelected,
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

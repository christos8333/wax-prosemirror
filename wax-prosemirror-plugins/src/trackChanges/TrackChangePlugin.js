import { Plugin, PluginKey } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";

import { findSelectedChanges } from "./find_selected_changes";
import { deactivateAllSelectedChanges } from "./helpers";

export const key = new PluginKey("track");
export const selectedInsertionSpec = {};
export const selectedDeletionSpec = {};
export const selectedChangeFormatSpec = {};
export const selectedChangeBlockSpec = {};

export default options => {
  return new Plugin({
    key,
    state: {
      init(config, state) {
        const userIds = ["33"];
        state.doc.descendants(node => {
          if (node.attrs.track) {
            console.log("11111111");
            node.attrs.track.forEach(track => {
              if (!userIds.includes(track.user) && track.user !== 0) {
                userIds.push(track.user);
              }
            });
          } else {
            console.log(node.marks);
            node.marks.forEach(mark => {
              if (
                ["deletion", "insertion", "format_change"].includes(
                  mark.type.name
                ) &&
                !userIds.includes(mark.attrs.user) &&
                mark.attrs.user !== 0
              ) {
                userIds.push(mark.attrs.user);
              }
            });
          }
        });

        return {
          decos: DecorationSet.empty
        };
      },
      apply(tr, prev, oldState, state) {
        const meta = tr.getMeta(key);
        if (meta) {
          // There has been an update, return values from meta instead
          // of previous values
          return meta;
        }

        let { decos } = this.getState(oldState);

        if (tr.selectionSet) {
          const { insertion, deletion, formatChange } = findSelectedChanges(
            state
          );
          decos = DecorationSet.empty;
          const decoType = tr.selection.node
            ? Decoration.node
            : Decoration.inline;
          if (insertion) {
            console.log("insertion");
            decos = decos.add(tr.doc, [
              decoType(
                insertion.from,
                insertion.to,
                {
                  class: "selected-insertion"
                },
                selectedInsertionSpec
              )
            ]);
          }
          if (deletion) {
            console.log("deletion");
            decos = decos.add(tr.doc, [
              decoType(
                deletion.from,
                deletion.to,
                {
                  class: "selected-deletion"
                },
                selectedDeletionSpec
              )
            ]);
          }
          if (formatChange) {
            console.log("change format");
            decos = decos.add(tr.doc, [
              decoType(
                formatChange.from,
                formatChange.to,
                {
                  class: "selected-format_change"
                },
                selectedChangeFormatSpec
              )
            ]);
          }
        } else {
          decos = decos.map(tr.mapping, tr.doc);
        }
        return {
          decos
        };
      }
    },
    props: {
      decorations(state) {
        const { decos } = this.getState(state);
        return decos;
      },
      handleDOMEvents: {
        focus: (view, _event) => {
          view.dispatch(deactivateAllSelectedChanges(view.state.tr));
        }
      }
    }
  });
};

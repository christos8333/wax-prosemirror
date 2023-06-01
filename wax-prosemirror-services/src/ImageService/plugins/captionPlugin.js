import { DecorationSet } from 'prosemirror-view';
import { Plugin, PluginKey, NodeSelection } from 'prosemirror-state';
import { Commands } from 'wax-prosemirror-core';

let imgDataId = '';
let counter = 0;

const captionPlugin = key =>
  new Plugin({
    key: new PluginKey(key),
    state: {
      init() {
        return DecorationSet.empty;
      },
      apply(tr, set) {
        let setMap = set;
        setMap = setMap.map(tr.mapping, tr.doc);
        setMap = setMap.remove(set.find(null, null, spec => spec.id != null));
        return setMap;
      },
    },
    props: {
      decorations(state) {
        return this.getState(state);
      },
      handleDOMEvents: {
        mousedown(view, e) {
          const captionPlugins = view.state.plugins.find(plugin =>
            plugin.key.startsWith('caption$'),
          );

          if (
            e.target.nodeName === 'IMG' &&
            e.target.parentNode.lastElementChild.nodeName !== 'FIGCAPTION'
          ) {
            imgDataId = e.target.getAttribute('data-id');
            let pos = view.posAtDOM(e.target);
            const id = {};
            const { tr } = view.state;
            pos += 1;
            //  insert figure caption node
            view.dispatch(
              tr
                .replaceWith(
                  pos,
                  pos,
                  view.state.schema.nodes.figcaption.create({
                    class: 'decoration',
                    id: imgDataId,
                  }),
                )
                .setMeta(captionPlugins, {
                  add: { id, pos },
                }),
            );
          }

          if (e.target.nodeName === 'IMG') {
            let pos = view.posAtDOM(e.target);
            const { $from } = view.state.selection;
            const same = $from.sharedDepth(pos);
            if (same === 0) return false;
            pos = $from.before(same);
            view.dispatch(
              view.state.tr.setSelection(
                NodeSelection.create(view.state.doc, pos),
              ),
            );
          }

          return false;
        },

        keyup(view, e) {
          if (e.key === 'Enter') {
            if (
              view.state.selection.$head.path[6] &&
              view.state.selection.$head.path[6].type.name === 'figcaption'
            ) {
              counter += 1;
              setTimeout(() => {
                counter = 0;
              }, 1500);
            }

            if (
              view.state.selection.$head.path[6] &&
              view.state.selection.$head.path[6].type.name === 'figcaption' &&
              counter === 2
            ) {
              let captionId = '';
              view.state.doc.nodesBetween(
                view.state.selection.from,
                view.state.selection.from,
                node => {
                  if (node.type.name === 'figcaption') {
                    captionId = node.attrs.id;
                  }
                },
              );
              const figCapEl = document.getElementById(captionId);

              view.dispatch(
                view.state.tr.setSelection(
                  NodeSelection.create(
                    view.state.doc,
                    view.posAtDOM(figCapEl.parentElement),
                  ),
                ),
              );
              Commands.simulateKey(view, 13, 'Enter');
              Commands.simulateKey(view, 13, 'Enter');
              counter = 0;
            }
          }
          // delete caption if figure is deleted
          if (e.key === 'Delete' || e.code === 'Backspace') {
            const figCap = view.state.selection.$head.path;
            if (figCap[6] && figCap[6].type.name === 'figcaption') {
              const figCapEl = document.getElementById(figCap[6].attrs.id);

              if (
                figCapEl &&
                figCapEl.parentElement.firstChild.tagName === 'FIGCAPTION'
              ) {
                figCapEl.parentElement.remove();
              }
            }
          }
        },
      },
    },
  });

export default captionPlugin;

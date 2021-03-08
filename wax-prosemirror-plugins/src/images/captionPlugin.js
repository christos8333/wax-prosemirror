import { DecorationSet } from 'prosemirror-view';
import { Plugin, PluginKey } from 'prosemirror-state';

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
            const id = {};
            const { tr } = view.state;
            const pos = view.posAtDOM(e.target);
            const pos1 = pos + 1;
            //  insert figure caption node
            view.dispatch(
              tr
                .replaceWith(
                  pos1,
                  pos1,
                  view.state.schema.nodes.figcaption.create({
                    class: 'decoration',
                    dataContent: 'Caption : ',
                  }),
                )
                .setMeta(captionPlugins, {
                  add: { id, pos: pos + 1 },
                }),
            );
          } else if (e.target.nodeName !== 'FIGCAPTION') {
            const decorationelement = document.getElementsByTagName(
              'figcaption',
            );
            const decorationLength = decorationelement.length;

            if (decorationLength) {
              for (let i = 0; i < decorationLength; i += 1) {
                if (!decorationelement[i].textContent.length) {
                  decorationelement[i].remove();
                } else if (
                  decorationelement[i].parentElement.firstChild.tagName ===
                  'FIGCAPTION'
                ) {
                  decorationelement[i].parentElement.remove();
                }
              }
            }
          }

          return true;
        },
        keyup(view, e) {
          // delete caption if figure is deleted
          if (e.key === 'Delete') {
            const figcap = document.getElementsByTagName('figcaption');
            const figcapLength = figcap.length;

            if (figcapLength) {
              for (let i = 0; i < figcapLength; i += 1) {
                if (
                  figcap[i].parentElement.firstChild.tagName === 'FIGCAPTION'
                ) {
                  figcap[i].parentElement.remove();
                }
              }
            }
          }
        },
      },
    },
  });

export default captionPlugin;

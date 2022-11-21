import hljs from 'highlight.js/lib/core';
import { getHighlightDecorations } from 'prosemirror-highlightjs';
import { DecorationSet } from 'prosemirror-view';
import { Plugin, PluginKey } from 'prosemirror-state';

const key = new PluginKey('codeHighlight');

const highlightPlugin = (nodeTypes = ['code_block']) => {
  return new Plugin({
    key,
    state: {
      init(_, instance) {
        const content = getHighlightDecorations(
          instance.doc,
          hljs,
          nodeTypes,
          () => undefined,
        );
        return DecorationSet.create(instance.doc, content);
      },
      apply(tr, set, state) {
        if (!tr.docChanged) {
          return set.map(tr.mapping, tr.doc);
        }

        const {
          selection: { $from, $to },
          doc,
        } = state;
        let codeBlock = false;

        doc.nodesBetween($from.pos, $to.pos, node => {
          if (node.type.name === 'code_block') {
            codeBlock = true;
          }
        });

        if (codeBlock) {
          const content = getHighlightDecorations(
            tr.doc,
            hljs,
            nodeTypes,
            () => undefined,
          );

          return DecorationSet.create(tr.doc, content);
        }
        return set.map(tr.mapping, tr.doc);
      },
    },
    props: {
      decorations(state) {
        return this.getState(state);
      },
    },
  });
};

export default highlightPlugin;

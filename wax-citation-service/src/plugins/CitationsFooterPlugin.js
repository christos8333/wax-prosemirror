/* eslint-disable no-plusplus */

/* eslint-disable camelcase */

import { Plugin, PluginKey } from 'prosemirror-state';

const citationsFooterPlugin = new PluginKey('citationsFooterPlugin');

export default (key, app) => {
  return new Plugin({
    key: citationsFooterPlugin,
    appendTransaction(transactions, oldState, newState) {
      const { doc, tr } = newState;
      const lastNode = newState.doc.lastChild;
      const { citations_data_node } = newState.schema.nodes;

      // A more reliable way to check if there is more than one footer
      let existingFooter = {};
      let footerCount = 0;
      doc.descendants((node, pos) => {
        if (node.type.name === 'citations_data_node') {
          footerCount++;
          existingFooter = {
            node,
            pos,
          };
        }
      });

      if (footerCount > 1) {
        // If there are multiple, delete all but the last one
        const deleteTr = newState.tr;
        doc.descendants((node, pos) => {
          if (
            node.type.name === 'citations_data_node' &&
            node !== doc.lastChild
          ) {
            deleteTr.delete(pos, pos + node.nodeSize);
          }
        });
        return deleteTr;
      }

      if (!lastNode || lastNode.type !== citations_data_node) {
        const newFooter = citations_data_node.create({
          text: 'This content is uneditable.',
        });
        tr.insert(newState.doc.content.size, newFooter);
      }

      if (tr.docChanged) {
        return tr;
      }
      return tr;
    },
  });
};

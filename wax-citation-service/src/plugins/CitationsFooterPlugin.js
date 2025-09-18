/* eslint-disable no-plusplus */

/* eslint-disable camelcase */

import { Plugin, PluginKey } from 'prosemirror-state';

const citationsFooterPlugin = new PluginKey('citationsFooterPlugin');

export default (key, app) => {
  return new Plugin({
    key: citationsFooterPlugin,
    appendTransaction(transactions, oldState, newState) {
      // Only process if the document structure actually changed
      if (oldState.doc.eq(newState.doc)) {
        return null;
      }

      const { doc, tr } = newState;

      const { citations_data_node } = newState.schema.nodes;

      // Check if we need to do anything at all
      let footerCount = 0;
      let hasFooterAtEnd = false;

      doc.descendants((node, pos) => {
        if (node.type.name === 'citations_data_node') {
          footerCount++;
          // Check if this is the last node
          if (pos + node.nodeSize === doc.content.size) {
            hasFooterAtEnd = true;
          }
        }
      });

      // If we already have exactly one footer at the end, do nothing
      if (footerCount === 1 && hasFooterAtEnd) {
        return null;
      }

      // If there are multiple footers, clean them up
      if (footerCount > 1) {
        const deleteTr = newState.tr;
        const footerPositions = [];

        // First, collect all footer positions
        doc.descendants((node, pos) => {
          if (node.type.name === 'citations_data_node') {
            footerPositions.push({ pos, size: node.nodeSize });
          }
        });

        // Delete from the end to avoid position shifts
        footerPositions
          .sort((a, b) => b.pos - a.pos) // Sort in descending order
          .forEach(({ pos, size }) => {
            deleteTr.delete(pos, pos + size);
          });

        return deleteTr;
      }

      // If no footer exists, add one
      if (footerCount === 0) {
        const newFooter = citations_data_node.create({
          text: 'This content is uneditable.',
        });
        tr.insert(newState.doc.content.size, newFooter);
        return tr;
      }

      // If footer exists but not at the end, move it
      if (footerCount === 1 && !hasFooterAtEnd) {
        const moveTr = newState.tr;
        let footerPos = null;
        let footerSize = null;

        // Find existing footer position
        doc.descendants((node, pos) => {
          if (node.type.name === 'citations_data_node') {
            footerPos = pos;
            footerSize = node.nodeSize;
          }
        });

        if (footerPos !== null && footerSize !== null) {
          // Delete existing footer
          moveTr.delete(footerPos, footerPos + footerSize);

          // Add footer at the end
          const newFooter = citations_data_node.create({
            text: 'This content is uneditable.',
          });
          moveTr.insert(newState.doc.content.size - footerSize, newFooter);
        }

        return moveTr;
      }

      return null;
    },
  });
};

/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
import { TextSelection, Plugin, PluginKey } from 'prosemirror-state';
import citationDataService from '../services/CitationDataService';

const citationsFooterPlugin = new PluginKey('citationsFooterPlugin');

export default (key, app) => {
  return new Plugin({
    key: citationsFooterPlugin,
    appendTransaction(transactions, oldState, newState) {
      const { doc, tr } = newState;
      const { citations_data_node } = newState.schema.nodes;

      // Check if there's a footer and if cursor is trying to type after it
      let footerPos = null;
      let footerSize = null;

      doc.descendants((node, pos) => {
        if (node.type.name === 'citations_data_node') {
          footerPos = pos;
          footerSize = node.nodeSize;
        }
      });

      // If footer exists and cursor is after it, move cursor to before the footer
      if (footerPos !== null && footerSize !== null) {
        const footerEnd = footerPos + footerSize;
        const { selection } = newState;

        // Check if selection is after the footer
        if (selection.from >= footerEnd) {
          const newTr = newState.tr;
          // Move cursor to just before the footer
          const newPos = Math.max(0, footerPos - 1);
          const newSelection = TextSelection.near(doc.resolve(newPos));
          newTr.setSelection(newSelection);
          return newTr;
        }
      }

      // Only run citation management if document actually changed
      if (oldState.doc.eq(newState.doc)) {
        return null;
      }

      // Count citations in old and new state
      let oldCitationCount = 0;
      let newCitationCount = 0;

      oldState.doc.descendants(node => {
        if (node.type.name === 'citation_callout') {
          oldCitationCount++;
        }
      });

      newState.doc.descendants(node => {
        if (node.type.name === 'citation_callout') {
          newCitationCount++;
        }
      });

      // Run if citation count changed OR if we need to check for order changes
      const citationCountChanged = oldCitationCount !== newCitationCount;
      if (!citationCountChanged) {
        // Even if count didn't change, check if order changed (for drag & drop)
        const oldOrder = [];
        const newOrder = [];

        oldState.doc.descendants(node => {
          if (node.type.name === 'citation_callout') {
            oldOrder.push(node.attrs?.id);
          }
        });

        newState.doc.descendants(node => {
          if (node.type.name === 'citation_callout') {
            newOrder.push(node.attrs?.id);
          }
        });

        // If order is the same, don't run
        if (JSON.stringify(oldOrder) === JSON.stringify(newOrder)) {
          return null;
        }
      }

      // Track citations for Vancouver numbering (unique IDs only)
      const citationIdsInOrder = [];
      const allCitationInstances = []; // Track all instances (including duplicates)
      
      newState.doc.descendants((node, pos) => {
        if (node.type.name === 'citation_callout') {
          const citationId = node.attrs?.id;
          if (citationId) {
            // Track all instances (including duplicates)
            allCitationInstances.push(citationId);

            // Track unique IDs for Vancouver numbering
            if (!citationIdsInOrder.includes(citationId)) {
              citationIdsInOrder.push(citationId);
              citationDataService.assignNumber(citationId);
            }
          }
        }
      });

      // Update citation order if it changed
      const currentOrder = citationDataService.citationOrder;
      const hasChanged =
        JSON.stringify(currentOrder) !== JSON.stringify(citationIdsInOrder);
      if (hasChanged) {
        citationDataService.setCitationOrder(citationIdsInOrder);
        // Reorder Vancouver numbers based on new document order
        citationDataService.reorderVancouverNumbers(citationIdsInOrder);
      }

      // Update visible citation instances (for non-Vancouver styles)
      citationDataService.setVisibleCitationInstances(allCitationInstances);

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

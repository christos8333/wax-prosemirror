import { Plugin } from 'prosemirror-state';
import citationDataService from '../services/CitationDataService';

const CitationCleanupPlugin = () => {
  return new Plugin({
    appendTransaction(transactions, oldState, newState) {
      const visibleCitations = new Set();
      newState.doc.descendants((node, pos) => {
        if (node.type.name === 'citation_callout') {
          visibleCitations.add(node.attrs.id);
        }
      });

      citationDataService.setVisibleCitations(visibleCitations);

      return null;
    },
  });
};

export default CitationCleanupPlugin;

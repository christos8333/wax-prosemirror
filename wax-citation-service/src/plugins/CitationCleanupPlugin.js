import { Plugin } from 'prosemirror-state';
import citationDataService from '../services/CitationDataService';

const CitationCleanupPlugin = () => {
  return new Plugin({
    appendTransaction(transactions, oldState, newState) {
      const visibleCitations = new Set();
      const visibleCitationInstances = [];
      const citationOrder = [];
      
      newState.doc.descendants(node => {
        if (node.type.name === 'citation_callout') {
          const citationId = node.attrs.id;
          visibleCitations.add(citationId);
          visibleCitationInstances.push(citationId);
          
          // Track unique IDs for Vancouver numbering (first occurrence only)
          if (!citationOrder.includes(citationId)) {
            citationOrder.push(citationId);
          }
        }
      });

      citationDataService.setVisibleCitations(visibleCitations);
      citationDataService.setVisibleCitationInstances(visibleCitationInstances);
      citationDataService.setCitationOrder(citationOrder);

      return null;
    },
  });
};

export default CitationCleanupPlugin;

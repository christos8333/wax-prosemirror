import citationDataService from '../services/CitationDataService';

const citationCallout = {
  attrs: {
    id: { default: '' },
    class: { default: 'citation-callout' },
    citationData: { default: null },
    citationText: { default: '' },
  },
  group: 'inline',
  content: 'text*',
  inline: true,
  atom: true,
  draggable: true,
  excludes: 'citation_callout',
  parseDOM: [
    {
      tag: 'span.citation-callout',
      getAttrs(dom) {
        const citationId = dom.getAttribute('id');

        // Handle import: if citation data doesn't exist, create it
        if (citationId && !citationDataService.getCitation(citationId)) {
          // Create placeholder citation data
          const placeholderData = {
            id: citationId,
            title: `Imported Citation ${citationId.substring(0, 8)}...`,
            author: [{ family: 'Unknown', given: 'Author' }],
            issued: { 'date-parts': [[2023]] },
            type: 'article-journal',
            'container-title': 'Imported Journal',
            volume: '1',
            issue: '1',
            page: '1-10',
            DOI: `10.1000/imported.${citationId.substring(0, 8)}`,
          };

          citationDataService.addCitation(citationId, placeholderData);

          // Add to visible citations
          const currentVisible = citationDataService.getVisibleCitations();
          citationDataService.setVisibleCitations(
            new Set([...currentVisible, citationId]),
          );

          // Add to visible instances
          const currentInstances = citationDataService.getVisibleCitationInstances();
          citationDataService.setVisibleCitationInstances([
            ...currentInstances,
            citationId,
          ]);
        }

        return {
          id: citationId,
          class: dom.getAttribute('class'),
        };
      },
    },
  ],
  toDOM: node => {
    const citationId = node.attrs.id;
    const citationData = citationDataService.getCitation(citationId);

    if (!citationData) {
      return ['span', node.attrs, `[${citationId}]`];
    }

    // Get the current citation format from service
    const citationFormat = citationDataService.getCurrentFormat();

    // Generate the appropriate citation text based on format
    let citationText;

    if (citationFormat === 'vancouver' || citationFormat === 'ieee') {
      // For Vancouver and IEEE, show the numbered format
      const vancouverNumber = citationDataService.getVancouverNumber(
        citationId,
      );
      citationText = `[${vancouverNumber || '?'}]`;
    } else if (citationFormat === 'APA') {
      // For APA, show (Author, Year) format
      if (citationData.author && citationData.author[0]) {
        const author = citationData.author[0];
        const year =
          citationData.issued && citationData.issued['date-parts']
            ? citationData.issued['date-parts'][0][0]
            : 'n.d.';
        citationText = `(${author.family}, ${year})`;
      } else {
        citationText = `[${citationId}]`;
      }
    } else if (citationFormat === 'MLA') {
      // For MLA, show (Author) format
      if (citationData.author && citationData.author[0]) {
        const author = citationData.author[0];
        citationText = `(${author.family})`;
      } else {
        citationText = `[${citationId}]`;
      }
    } else if (citationFormat === 'harvard') {
      // For Harvard, show (Author, Year) format
      if (citationData.author && citationData.author[0]) {
        const author = citationData.author[0];
        const year =
          citationData.issued && citationData.issued['date-parts']
            ? citationData.issued['date-parts'][0][0]
            : 'n.d.';
        citationText = `(${author.family}, ${year})`;
      } else {
        citationText = `[${citationId}]`;
      }
    } else {
      // For simple and other formats, show (Author, Year)
      if (citationData.author && citationData.author[0]) {
        const author = citationData.author[0];
        const year =
          citationData.issued && citationData.issued['date-parts']
            ? citationData.issued['date-parts'][0][0]
            : 'n.d.';
        citationText = `(${author.family}, ${year})`;
      } else {
        citationText = `[${citationId}]`;
      }
    }

    return ['span', { ...node.attrs, 'data-id': citationId }, citationText];
  },
};

export default citationCallout;

/* eslint-disable no-else-return */
/* eslint-disable prefer-template */
/* eslint-disable radix */
/* eslint-disable prefer-destructuring */
import citationDataService from '../services/CitationDataService';

const citationsDataNode = {
  attrs: {
    text: { default: 'This is uneditable content at the end of the document.' },
  },
  content: 'text*',
  group: 'block',
  atom: true,
  selectable: false,
  draggable: false,
  defining: true,
  isolating: true,
  toDOM(node) {
    // Get the current citation format
    const citationFormat = citationDataService.getCurrentFormat();

    // Get citations based on format
    let citations;
    if (citationFormat === 'vancouver' || citationFormat === 'ieee') {
      citations = citationDataService.getCitationsInVancouverOrder();
    } else {
      // For other formats, show all citation instances (including duplicates)
      citations = citationDataService.getVisibleCitationInstances();
    }

    if (!citations || citations.length === 0) {
      return [
        'div',
        { class: 'citations-data' },
        'This content is uneditable.',
      ];
    }

    // Generate the references list as DOM structure
    const referencesElements = ['h1', 'References'];

    if (citationFormat === 'vancouver' || citationFormat === 'ieee') {
      // Use ordered list for Vancouver/IEEE
      const listItems = citations.map(citation => {
        const citationText = formatCitation(citation, citationFormat);
        return ['li', { 'data-id': citation.id }, citationText];
      });
      referencesElements.push(['ol', ...listItems]);
    } else {
      // Use unordered list for other formats
      const listItems = citations.map(citation => {
        const citationText = formatCitation(citation, citationFormat);
        return ['li', { 'data-id': citation.id }, citationText];
      });
      referencesElements.push(['ul', ...listItems]);
    }

    return [
      'div',
      { class: 'citations-data', 'data-citation-format': citationFormat },
      ...referencesElements,
    ];
  },
  parseDOM: [
    {
      tag: 'div.citations-data',
      getAttrs(dom) {
        // Extract the citation format from the data attribute
        const citationFormat = dom.getAttribute('data-citation-format');
        if (citationFormat) {
          // Set the citation format in the service
          citationDataService.setCurrentFormat(citationFormat);

          // Extract citation data from list items
          const listItems = dom.querySelectorAll('li[data-id]');

          listItems.forEach((li, index) => {
            const citationId = li.getAttribute('data-id');
            const citationText = li.textContent.trim();

            if (citationId && citationText) {
              // Parse the citation text to extract real data
              const parsedData = parseCitationText(
                citationText,
                citationFormat,
              );

              // Update the citation data in the service
              // Ensure the citation ID is set correctly
              const citationDataWithId = { ...parsedData, id: citationId };

              if (citationDataService.getCitation(citationId)) {
                citationDataService.updateCitation(
                  citationId,
                  citationDataWithId,
                );
              } else {
                citationDataService.addCitation(citationId, citationDataWithId);
              }
            }
          });

          // For Vancouver/IEEE, we need to reorder numbers based on document order
          if (citationFormat === 'vancouver' || citationFormat === 'ieee') {
            // Use the citation IDs that were just parsed from the footer
            const parsedCitationIds = Array.from(listItems).map(li =>
              li.getAttribute('data-id'),
            );
            if (parsedCitationIds.length > 0) {
              citationDataService.reorderVancouverNumbers(parsedCitationIds);
            }
          }
        }
        return { text: dom.textContent };
      },
    },
  ],
};

// Helper function to parse citation text during import
function parseCitationText(text, citationFormat) {
  // Basic parsing - extract common elements
  const citation = {
    id: '', // Will be set by caller
    type: 'article-journal',
    title: '',
    author: [],
    issued: { 'date-parts': [[]] },
    'container-title': '',
    volume: '',
    issue: '',
    page: '',
    DOI: '',
  };

  if (citationFormat === 'vancouver') {
    // Vancouver format: Author A. Title. Journal. Year;Volume(Issue):Pages.
    // Example: "Smith J. Collaboration in Virtual Environments: A Study of Remote Team Dynamics. Journal of Digital Research. 2023;15(2):123-135."

    const parts = text.split('.');
    if (parts.length >= 3) {
      // First part: Author
      const authorPart = parts[0].trim();
      const authorMatch = authorPart.match(/^(.+?)\s+([A-Z])$/);
      if (authorMatch) {
        citation.author = [
          {
            family: authorMatch[1].trim(),
            given: authorMatch[2] + '.',
          },
        ];
      }

      // Second part: Title
      citation.title = parts[1].trim();

      // Third part: Journal and year/volume info
      const journalPart = parts[2].trim();

      // Try to match: "Journal Name. Year;Volume(Issue):Pages"
      const yearMatch = journalPart.match(
        /^(.+?)\.\s*(\d{4});(\d+)(?:\((\d+)\))?(?::(.+))?\.?$/,
      );
      if (yearMatch) {
        citation['container-title'] = yearMatch[1].trim();
        citation.issued = { 'date-parts': [[parseInt(yearMatch[2])]] };
        citation.volume = yearMatch[3];
        if (yearMatch[4]) citation.issue = yearMatch[4];
        if (yearMatch[5]) citation.page = yearMatch[5];
      } else {
        // Try alternative pattern: "Journal Name Year;Volume(Issue):Pages"
        const altMatch = journalPart.match(
          /^(.+?)\s+(\d{4});(\d+)(?:\((\d+)\))?(?::(.+))?\.?$/,
        );
        if (altMatch) {
          citation['container-title'] = altMatch[1].trim();
          citation.issued = { 'date-parts': [[parseInt(altMatch[2])]] };
          citation.volume = altMatch[3];
          if (altMatch[4]) citation.issue = altMatch[4];
          if (altMatch[5]) citation.page = altMatch[5];
        } else {
          // Fallback: just journal name and year
          const simpleMatch = journalPart.match(/^(.+?)\s+(\d{4})/);
          if (simpleMatch) {
            citation['container-title'] = simpleMatch[1].trim();
            citation.issued = { 'date-parts': [[parseInt(simpleMatch[2])]] };
          } else {
            citation['container-title'] = journalPart;
            citation.issued = { 'date-parts': [[2023]] };
          }
        }
      }
    }
  } else if (citationFormat === 'ieee') {
    // IEEE format: [number] J. Smith, "Title," Journal, vol. X, no. Y, pp. Z, Year.
    // Parse similar to Vancouver but with different structure

    const parts = text.split(',');
    if (parts.length >= 2) {
      // First part: Author
      const authorPart = parts[0].trim();
      const authorMatch = authorPart.match(/^\[?\d+\]?\s*([A-Z])\.\s*(.+)$/);
      if (authorMatch) {
        citation.author = [
          {
            given: authorMatch[1] + '.',
            family: authorMatch[2].trim(),
          },
        ];
      }

      // Second part: Title (in quotes)
      const titlePart = parts[1].trim();
      const titleMatch = titlePart.match(/^"(.+)"$/);
      if (titleMatch) {
        citation.title = titleMatch[1];
      }
    }
  } else if (citationFormat === 'simple') {
    // Simple format: Author, A. (Year). Title. Journal, Volume(Issue), pages.
    // Example: "Wells, H. (2017). The Machine. The Time Machine."

    // Try to match the pattern: Author, A. (Year). Title. Journal...
    const simpleMatch = text.match(
      /^(.+?),\s*([A-Z])\.\s*\((\d{4})\)\.\s*(.+?)\.\s*(.+)$/,
    );
    if (simpleMatch) {
      citation.author = [
        {
          family: simpleMatch[1].trim(),
          given: simpleMatch[2] + '.',
        },
      ];
      citation.issued = { 'date-parts': [[parseInt(simpleMatch[3])]] };
      citation.title = simpleMatch[4].trim();
      citation['container-title'] = simpleMatch[5].trim();
    } else {
      // Try simpler pattern: Author, A. (Year). Title.
      const simpleMatch2 = text.match(
        /^(.+?),\s*([A-Z])\.\s*\((\d{4})\)\.\s*(.+)$/,
      );
      if (simpleMatch2) {
        citation.author = [
          {
            family: simpleMatch2[1].trim(),
            given: simpleMatch2[2] + '.',
          },
        ];
        citation.issued = { 'date-parts': [[parseInt(simpleMatch2[3])]] };
        citation.title = simpleMatch2[4].trim();
      }
    }
  }

  // If parsing failed, create a basic structure from the text
  if (!citation.title) {
    citation.title = text.substring(0, 50) + (text.length > 50 ? '...' : '');
    citation.author = [{ family: 'Unknown', given: 'Author' }];
    citation.issued = { 'date-parts': [[2023]] };
    citation['container-title'] = 'Unknown Journal';
  }

  return citation;
}

// Helper function to format citations for export
function formatCitation(citation, citationFormat) {
  if (!citation) return '';

  if (citationFormat === 'vancouver') {
    // Vancouver format: 1. Author. Title. Journal. Year;Volume(Issue):Pages.
    const author =
      citation.author && citation.author[0]
        ? `${citation.author[0].family} ${
            citation.author[0].given
              ? citation.author[0].given.charAt(0) + '.'
              : ''
          }`
        : 'Unknown Author';
    const title = citation.title || 'Untitled';
    const journal = citation['container-title'] || '';
    const year =
      citation.issued && citation.issued['date-parts']
        ? citation.issued['date-parts'][0][0]
        : 'n.d.';
    const volume = citation.volume || '';
    const issue = citation.issue || '';
    const pages = citation.page || '';

    let reference = `${author} ${title}.`;
    if (journal) reference += ` ${journal}.`;
    if (year) reference += ` ${year}`;
    if (volume) reference += `;${volume}`;
    if (issue) reference += `(${issue})`;
    if (pages) reference += `:${pages}`;
    reference += '.';

    return reference;
  } else if (citationFormat === 'ieee') {
    // IEEE format: [number] J. Smith, "Title," Journal, vol. X, no. Y, pp. Z, Year.
    const author =
      citation.author && citation.author[0]
        ? `${
            citation.author[0].given
              ? citation.author[0].given.charAt(0) + '.'
              : ''
          } ${citation.author[0].family}`
        : 'Unknown Author';
    const title = citation.title ? `"${citation.title}"` : 'Untitled';
    const journal = citation['container-title'] || '';
    const volume = citation.volume || '';
    const issue = citation.issue || '';
    const pages = citation.page || '';
    const year =
      citation.issued && citation.issued['date-parts']
        ? citation.issued['date-parts'][0][0]
        : 'n.d.';

    let reference = `${author}, ${title}`;
    if (journal) reference += `, ${journal}`;
    if (volume) reference += `, vol. ${volume}`;
    if (issue) reference += `, no. ${issue}`;
    if (pages) reference += `, pp. ${pages}`;
    reference += `, ${year}.`;

    return reference;
  } else if (citationFormat === 'APA') {
    // APA format: Author, A. A. (Year). Title. Journal, Volume(Issue), pages.
    const author =
      citation.author && citation.author[0]
        ? `${citation.author[0].family}, ${
            citation.author[0].given
              ? citation.author[0].given.charAt(0) + '.'
              : ''
          }`
        : 'Unknown Author';
    const year =
      citation.issued && citation.issued['date-parts']
        ? citation.issued['date-parts'][0][0]
        : 'n.d.';
    const title = citation.title || 'Untitled';
    const journal = citation['container-title'] || '';
    const volume = citation.volume || '';
    const issue = citation.issue || '';
    const pages = citation.page || '';

    let reference = `${author} (${year}). ${title}.`;
    if (journal) reference += ` ${journal}`;
    if (volume) reference += `, ${volume}`;
    if (issue) reference += `(${issue})`;
    if (pages) reference += `, ${pages}`;
    reference += '.';

    return reference;
  } else if (citationFormat === 'MLA') {
    // MLA format: Author. "Title." Journal, vol. X, no. Y, Year, pp. Z.
    const author =
      citation.author && citation.author[0]
        ? `${citation.author[0].family}, ${citation.author[0].given || ''}`
        : 'Unknown Author';
    const title = citation.title ? `"${citation.title}"` : 'Untitled';
    const journal = citation['container-title'] || '';
    const volume = citation.volume || '';
    const issue = citation.issue || '';
    const year =
      citation.issued && citation.issued['date-parts']
        ? citation.issued['date-parts'][0][0]
        : 'n.d.';
    const pages = citation.page || '';

    let reference = `${author}. ${title}.`;
    if (journal) reference += ` ${journal}`;
    if (volume) reference += `, vol. ${volume}`;
    if (issue) reference += `, no. ${issue}`;
    reference += `, ${year}`;
    if (pages) reference += `, pp. ${pages}`;
    reference += '.';

    return reference;
  } else if (citationFormat === 'harvard') {
    // Harvard format: Author, A 2023, 'Title', Journal, vol. X, no. Y, pp. Z.
    const author =
      citation.author && citation.author[0]
        ? `${citation.author[0].family}, ${
            citation.author[0].given
              ? citation.author[0].given.charAt(0) + ' '
              : ''
          }`
        : 'Unknown Author';
    const year =
      citation.issued && citation.issued['date-parts']
        ? citation.issued['date-parts'][0][0]
        : 'n.d.';
    const title = citation.title ? `'${citation.title}'` : 'Untitled';
    const journal = citation['container-title'] || '';
    const volume = citation.volume || '';
    const issue = citation.issue || '';
    const pages = citation.page || '';

    let reference = `${author}${year}, ${title}`;
    if (journal) reference += `, ${journal}`;
    if (volume) reference += `, vol. ${volume}`;
    if (issue) reference += `, no. ${issue}`;
    if (pages) reference += `, pp. ${pages}`;
    reference += '.';

    return reference;
  } else {
    // Simple format: Author, A. (Year). Title. Journal, Volume(Issue), pages.
    const author =
      citation.author && citation.author[0]
        ? `${citation.author[0].family}, ${
            citation.author[0].given
              ? citation.author[0].given.charAt(0) + '.'
              : ''
          }`
        : 'Unknown Author';
    const year =
      citation.issued && citation.issued['date-parts']
        ? citation.issued['date-parts'][0][0]
        : 'n.d.';
    const title = citation.title || 'Untitled';
    const journal = citation['container-title'] || '';
    const volume = citation.volume || '';
    const issue = citation.issue || '';
    const pages = citation.page || '';

    let reference = `${author} (${year}). ${title}.`;
    if (journal) reference += ` ${journal}`;
    if (volume) reference += `, ${volume}`;
    if (issue) reference += `(${issue})`;
    if (pages) reference += `, ${pages}`;
    reference += '.';

    return reference;
  }
}

export default citationsDataNode;

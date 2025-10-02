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
      citations = citationDataService.getVisibleCitationInstances();
    }
    
    if (!citations || citations.length === 0) {
      return ['div', { class: 'citations-data' }, 'This content is uneditable.'];
    }
    
    // Generate the references list
    let referencesHtml = '<h1>References</h1>';
    
    if (citationFormat === 'vancouver' || citationFormat === 'ieee') {
      // Use ordered list for Vancouver/IEEE
      referencesHtml += '<ol>';
      citations.forEach((citation, index) => {
        const citationText = formatCitation(citation, citationFormat);
        referencesHtml += `<li data-id="${citation.id}">${citationText}</li>`;
      });
      referencesHtml += '</ol>';
    } else {
      // Use unordered list for other formats
      referencesHtml += '<ul>';
      citations.forEach((citation, index) => {
        const citationText = formatCitation(citation, citationFormat);
        referencesHtml += `<li data-id="${citation.id}">${citationText}</li>`;
      });
      referencesHtml += '</ul>';
    }
    
    return ['div', { class: 'citations-data', 'data-citation-format': citationFormat }, referencesHtml];
  },
  parseDOM: [
    {
      tag: 'div.citations-data',
      getAttrs(dom) {
        // Extract the citation format from the data attribute
        const citationFormat = dom.getAttribute('data-citation-format');
        if (citationFormat) {
          console.log('Import: Found citation format:', citationFormat);
          // Set the citation format in the service
          citationDataService.setCurrentFormat(citationFormat);
          
          // Dispatch a custom event to notify the UI of the format change
          // This will help update the dropdown and other components
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('citationFormatImported', { 
              detail: { format: citationFormat } 
            }));
          }
        }
        return { text: dom.textContent };
      },
    },
  ],
};

// Helper function to format citations for export
function formatCitation(citation, citationFormat) {
  if (!citation) return '';
  
  if (citationFormat === 'vancouver') {
    // Vancouver format: 1. Author. Title. Journal. Year;Volume(Issue):Pages.
    const author = citation.author && citation.author[0] 
      ? `${citation.author[0].family} ${citation.author[0].given ? citation.author[0].given.charAt(0) + '.' : ''}`
      : 'Unknown Author';
    const title = citation.title || 'Untitled';
    const journal = citation['container-title'] || '';
    const year = citation.issued && citation.issued['date-parts'] 
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
    const author = citation.author && citation.author[0] 
      ? `${citation.author[0].given ? citation.author[0].given.charAt(0) + '.' : ''} ${citation.author[0].family}`
      : 'Unknown Author';
    const title = citation.title ? `"${citation.title}"` : 'Untitled';
    const journal = citation['container-title'] || '';
    const volume = citation.volume || '';
    const issue = citation.issue || '';
    const pages = citation.page || '';
    const year = citation.issued && citation.issued['date-parts'] 
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
    const author = citation.author && citation.author[0] 
      ? `${citation.author[0].family}, ${citation.author[0].given ? citation.author[0].given.charAt(0) + '.' : ''}`
      : 'Unknown Author';
    const year = citation.issued && citation.issued['date-parts'] 
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
    const author = citation.author && citation.author[0] 
      ? `${citation.author[0].family}, ${citation.author[0].given || ''}`
      : 'Unknown Author';
    const title = citation.title ? `"${citation.title}"` : 'Untitled';
    const journal = citation['container-title'] || '';
    const volume = citation.volume || '';
    const issue = citation.issue || '';
    const year = citation.issued && citation.issued['date-parts'] 
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
    const author = citation.author && citation.author[0] 
      ? `${citation.author[0].family}, ${citation.author[0].given ? citation.author[0].given.charAt(0) + ' ' : ''}`
      : 'Unknown Author';
    const year = citation.issued && citation.issued['date-parts'] 
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
    const author = citation.author && citation.author[0] 
      ? `${citation.author[0].family}, ${citation.author[0].given ? citation.author[0].given.charAt(0) + '.' : ''}`
      : 'Unknown Author';
    const year = citation.issued && citation.issued['date-parts'] 
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

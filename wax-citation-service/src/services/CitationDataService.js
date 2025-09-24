class CitationDataService {
  constructor() {
    this.citations = {};
    this.visibleCitations = new Set();
  }

  addCitation(citationId, citationData) {
    this.citations[citationId] = citationData;
  }

  getCitation(citationId) {
    return this.citations[citationId] || null;
  }

  updateCitation(citationId, citationData) {
    this.citations[citationId] = citationData;
  }

  removeCitation(citationId) {
    delete this.citations[citationId];
  }

  getAllCitations() {
    return this.citations;
  }

  setVisibleCitations(visibleCitations) {
    this.visibleCitations = visibleCitations;
  }

  getVisibleCitations() {
    // Return only citations that are currently visible in the document
    const visibleCitationsArray = [];
    this.visibleCitations.forEach(citationId => {
      if (this.citations[citationId]) {
        visibleCitationsArray.push(this.citations[citationId]);
      }
    });
    return visibleCitationsArray;
  }
}

const citationDataService = new CitationDataService();

export default citationDataService;

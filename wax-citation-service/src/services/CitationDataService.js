class CitationDataService {
  constructor() {
    this.citations = {};
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
}

const citationDataService = new CitationDataService();

export default citationDataService;

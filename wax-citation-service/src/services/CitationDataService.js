class CitationDataService {
  constructor() {
    this.citations = {};
    this.visibleCitations = new Set();
    this.visibleCitationInstances = []; // Track all citation instances (including duplicates) for non-Vancouver styles
    this.citationOrder = []; // Track order of first appearance of unique citation IDs
    this.citationNumbers = new Map(); // Map citation IDs to their permanent Vancouver numbers
    this.nextNumber = 1; // Next available Vancouver number
  }

  // Generate hash-based ID from citation content (same content = same ID)
  generateCitationId(citationData) {
    const citationContent = JSON.stringify({
      title: citationData.title,
      author: citationData.author,
      issued: citationData.issued
    });
    return btoa(citationContent).replace(/[^a-zA-Z0-9]/g, '').substring(0, 16);
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

  setVisibleCitationInstances(visibleCitationInstances) {
    this.visibleCitationInstances = visibleCitationInstances;
  }

  getVisibleCitations() {
    // Return only citations that are currently visible in the document (unique IDs only)
    const visibleCitationsArray = [];
    this.visibleCitations.forEach(citationId => {
      if (this.citations[citationId]) {
        visibleCitationsArray.push(this.citations[citationId]);
      }
    });
    return visibleCitationsArray;
  }

  getVisibleCitationInstances() {
    // Return all citation instances (including duplicates) for non-Vancouver styles
    return this.visibleCitationInstances.map(citationId => {
      if (this.citations[citationId]) {
        return this.citations[citationId];
      }
      return null;
    }).filter(citation => citation !== null);
  }

  // Assign a permanent number to a citation ID when first encountered (Vancouver)
  assignNumber(citationId) {
    if (!this.citationNumbers.has(citationId)) {
      this.citationNumbers.set(citationId, this.nextNumber);
      console.log(`Service: Assigned number ${this.nextNumber} to citation ${citationId}`);
      this.nextNumber++;
    }
    return this.citationNumbers.get(citationId);
  }

  // Get Vancouver number for a citation (permanent number)
  getVancouverNumber(citationId) {
    if (this.citationNumbers.has(citationId)) {
      return this.citationNumbers.get(citationId);
    }
    // If not assigned yet, assign it now
    return this.assignNumber(citationId);
  }

  // Add a citation to the order tracking (when it first appears)
  addToOrder(citationId) {
    if (!this.citationOrder.includes(citationId)) {
      this.citationOrder.push(citationId);
    }
  }

  // Get citations in Vancouver order (unique citations only, for Vancouver footer)
  getCitationsInVancouverOrder() {
    return this.citationOrder.map(citationId => {
      const citation = this.citations[citationId];
      if (citation) {
        return {
          ...citation,
          id: citationId,
          vancouverNumber: this.getVancouverNumber(citationId)
        };
      }
      return null;
    }).filter(citation => citation && this.visibleCitations.has(citation.id));
  }

  // Set the citation order based on document position
  setCitationOrder(citationIds) {
    this.citationOrder = citationIds;
  }
}

const citationDataService = new CitationDataService();

export default citationDataService;

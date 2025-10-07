/* eslint-disable no-bitwise */
/* eslint-disable operator-assignment */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
class CitationDataService {
  constructor() {
    this.citations = {};
    this.visibleCitations = new Set();
    this.visibleCitationInstances = []; // Track all citation instances (including duplicates) for non-Vancouver styles
    this.citationOrder = []; // Track order of first appearance of unique citation IDs
    this.citationNumbers = new Map(); // Map citation IDs to their permanent Vancouver numbers
    this.nextNumber = 1; // Next available Vancouver number
    this.updateCounter = 0; // Counter to force re-renders when Vancouver numbers change
    this.currentFormat = 'simple'; // Track current citation format for export
    this.contentToIdMap = new Map(); // Map citation content to their canonical ID
  }

  // Generate content-based ID (same content = same ID)
  generateCitationId(citationData) {
    // Create a normalized content string for comparison
    const citationContent = JSON.stringify({
      issued: citationData.issued,
      title: citationData.title,
      author: citationData.author,
    });

    // Check if we already have an ID for this content
    if (this.contentToIdMap.has(citationContent)) {
      const existingId = this.contentToIdMap.get(citationContent);

      return existingId;
    }

    // Generate new ID for new content using a more robust method
    const hash = this.simpleHash(citationContent);
    const baseId = hash.toString(36).substring(0, 16);

    // Store the mapping from content to ID
    this.contentToIdMap.set(citationContent, baseId);

    return baseId;
  }

  addCitation(citationId, citationData) {
    // Only store citation data if it doesn't exist or if it's more complete
    if (
      !this.citations[citationId] ||
      this.isCitationDataMoreComplete(citationData, this.citations[citationId])
    ) {
      this.citations[citationId] = citationData;
    }
  }

  // Helper method to check if new citation data is more complete than existing
  isCitationDataMoreComplete(newData, existingData) {
    // Simple heuristic: if new data has more fields or longer strings, it's more complete
    const newFields = Object.keys(newData).length;
    const existingFields = Object.keys(existingData).length;

    if (newFields > existingFields) return true;
    if (newFields < existingFields) return false;

    // If same number of fields, check if any fields are longer (more complete)
    for (const key in newData) {
      if (
        typeof newData[key] === 'string' &&
        typeof existingData[key] === 'string'
      ) {
        if (newData[key].length > existingData[key].length) return true;
      }
    }

    return false;
  }

  // Simple hash function for generating unique IDs
  simpleHash(str) {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
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
    // Ensure all IDs are strings and filter out any non-strings
    const stringIds = visibleCitationInstances.filter(id => typeof id === 'string');

    // Create a new array to avoid reference issues
    this.visibleCitationInstances = [...stringIds];
  }

  getVisibleCitations() {
    // Return only citations that are currently visible in the document (unique IDs only)
    const visibleCitationsArray = [];
    
    this.visibleCitations.forEach(citationId => {
      if (this.citations[citationId]) {
        visibleCitationsArray.push({
          ...this.citations[citationId],
          id: citationId,
        });
      }
    });

    return visibleCitationsArray;
  }

  getVisibleCitationInstances() {
    // Return all citation instances (including duplicates) for non-Vancouver and IEEE styles
    const instances = [];

    this.visibleCitationInstances.forEach(citationId => {
      const citation = this.citations[citationId];
      if (citation) {
        // Ensure each citation has the correct ID
        instances.push({
          ...citation,
          id: citationId,
        });
      } else {
        console.warn(`Citation data not found for ID: ${citationId}`);
      }
    });

    return instances;
  }

  // Assign a permanent number to a citation ID when first encountered (Vancouver and IEEE)
  assignNumber(citationId) {
    if (!this.citationNumbers.has(citationId)) {
      this.citationNumbers.set(citationId, this.nextNumber);
      this.nextNumber += 1;
    }
    return this.citationNumbers.get(citationId);
  }

  // Reorder Vancouver and IEEE numbers based on current document order
  reorderVancouverNumbers(citationIdsInOrder) {
    // Clear existing numbers
    this.citationNumbers.clear();
    this.nextNumber = 1;

    // Assign new numbers based on document order
    citationIdsInOrder.forEach(citationId => {
      this.citationNumbers.set(citationId, this.nextNumber);
      this.nextNumber += 1;
    });

    // Increment counter to notify components of changes
    this.updateCounter += 1;
  }

  // Get the update counter (for component re-renders)
  getUpdateCounter() {
    return this.updateCounter;
  }

  // Set the current citation format (for export)
  setCurrentFormat(format) {
    this.currentFormat = format;
  }

  // Get the current citation format (for export)
  getCurrentFormat() {
    return this.currentFormat;
  }

  // Get Vancouver and IEEE number for a citation (permanent number)
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
    const citations = [];

    this.citationOrder.forEach(citationId => {
      const citation = this.citations[citationId];
      if (citation && this.visibleCitations.has(citationId)) {
        citations.push({
          ...citation,
          id: citationId,
          vancouverNumber: this.getVancouverNumber(citationId),
        });
      }
    });

    return citations;
  }

  // Set the citation order based on document position
  setCitationOrder(citationIds) {
    this.citationOrder = citationIds;
  }
}

const citationDataService = new CitationDataService();

export default citationDataService;

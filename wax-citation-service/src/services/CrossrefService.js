/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-catch */
// Crossref API service for fetching citation data
class CrossrefService {
  constructor() {
    this.baseUrl = 'https://api.crossref.org/works';
    this.userAgent =
      'Wax-ProseMirror-Citation-Service/1.0 (https://example.com; mailto:contact@example.com)';
  }

  // Search for works using Crossref API
  async searchWorks(query, options = {}) {
    const {
      rows = 10,
      offset = 0,
      sort = 'relevance',
      order = 'desc',
      filter = '',
    } = options;

    const params = new URLSearchParams({
      query,
      rows: rows.toString(),
      offset: offset.toString(),
      sort,
      order,
    });

    if (filter) {
      params.append('filter', filter);
    }

    try {
      const response = await fetch(`${this.baseUrl}?${params}`, {
        method: 'GET',
        headers: {
          'User-Agent': this.userAgent,
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(
          `Crossref API error: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();
      return this.transformCrossrefData(data);
    } catch (error) {
      throw error;
    }
  }

  // Transform Crossref data to our citation format
  transformCrossrefData(crossrefData) {
    if (!crossrefData.message || !crossrefData.message.items) {
      return [];
    }

    return crossrefData.message.items.map(item => ({
      id:
        item.DOI ||
        `crossref_${item['container-title']?.[0]}_${
          item.issued?.['date-parts']?.[0]?.[0]
        }_${Math.random().toString(36).substr(2, 9)}`,
      type: this.mapCrossrefType(item.type),
      title: item.title?.[0] || 'Untitled',
      author: this.transformAuthors(item.author),
      issued: item.issued || { 'date-parts': [[new Date().getFullYear()]] },
      'container-title': item['container-title']?.[0] || '',
      volume: item.volume || '',
      issue: item.issue || '',
      page: item.page || '',
      DOI: item.DOI || '',
      URL: item.URL || '',
      publisher: item.publisher || '',
      abstract: item.abstract || '',
      language: item.language || 'en',
      source: 'crossref',
    }));
  }

  // Map Crossref types to our citation types
  mapCrossrefType(crossrefType) {
    const typeMap = {
      'journal-article': 'article-journal',
      book: 'book',
      'book-chapter': 'chapter',
      'proceedings-article': 'paper-conference',
      dissertation: 'thesis',
      report: 'report',
      'posted-content': 'article',
      dataset: 'dataset',
      software: 'software',
      monograph: 'book',
      'reference-book': 'book',
      'edited-book': 'book',
      'book-section': 'chapter',
      'conference-paper': 'paper-conference',
      proceedings: 'paper-conference',
    };

    return typeMap[crossrefType] || 'article-journal';
  }

  // Transform Crossref authors to our format
  transformAuthors(crossrefAuthors) {
    if (!crossrefAuthors || !Array.isArray(crossrefAuthors)) {
      return [{ family: 'Unknown', given: 'Author' }];
    }

    return crossrefAuthors.map(author => ({
      family: author.family || 'Unknown',
      given: author.given || author['given-names'] || '',
      suffix: author.suffix || '',
      'non-dropping-particle': author['non-dropping-particle'] || '',
      'dropping-particle': author['dropping-particle'] || '',
    }));
  }

  // Search by DOI
  async getWorkByDOI(doi) {
    try {
      const response = await fetch(`${this.baseUrl}/${doi}`, {
        method: 'GET',
        headers: {
          'User-Agent': this.userAgent,
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(
          `Crossref API error: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();
      return this.transformCrossrefData({ message: { items: [data.message] } });
    } catch (error) {
      throw error;
    }
  }

  // Search with specific filters
  async searchWithFilters(query, filters = {}) {
    const filterParts = [];

    if (filters.type) {
      filterParts.push(`type:${filters.type}`);
    }
    if (filters.fromYear) {
      filterParts.push(`from-pub-date:${filters.fromYear}`);
    }
    if (filters.untilYear) {
      filterParts.push(`until-pub-date:${filters.untilYear}`);
    }
    if (filters.journal) {
      filterParts.push(`container-title:${filters.journal}`);
    }

    return this.searchWorks(query, { filter: filterParts.join(',') });
  }
}

export default new CrossrefService();

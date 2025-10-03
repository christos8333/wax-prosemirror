/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useState, useEffect } from 'react';
import {
  WaxContext,
  PortalContext,
} from 'wax-prosemirror-core';
import styled from 'styled-components';
import citationDataService from '../services/CitationDataService';
import crossrefService from '../services/CrossrefService';

const CitationManagerContainer = styled.div`
  background-color: #f8f9fa;
  height: 100vh;
  padding: 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
    sans-serif;
  overflow-y: auto;
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 24px 0;
  line-height: 1.2;
`;

const TabContainer = styled.div`
  background-color: #e9ecef;
  border-radius: 8px;
  display: flex;
  margin-bottom: 24px;
  padding: 4px;
  width: fit-content;
`;

const Tab = styled.button`
  background-color: ${props => (props.active ? '#ffffff' : 'transparent')};
  border: ${props => (props.active ? '1px solid #dee2e6' : 'none')};
  border-radius: 6px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  color: #2c3e50;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-right: 4px;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    background-color: ${props => (props.active ? '#ffffff' : '#f8f9fa')};
  }
`;

const SearchContainer = styled.div`
  margin-bottom: 24px;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 600px;
  padding: 12px 16px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  font-size: 14px;
  background-color: #ffffff;
  margin-bottom: 16px;

  &::placeholder {
    color: #6c757d;
  }

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FilterDropdown = styled.select`
  padding: 8px 12px;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  background-color: #ffffff;
  font-size: 14px;
  color: #2c3e50;
  cursor: pointer;
  min-width: 200px;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

const SectionHeading = styled.h2`
  color: #2c3e50;
  font-size: 20px;
  font-weight: 700;
  margin: 32px 0 24px 0;
  line-height: 1.3;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: #6c757d;
  font-size: 14px;
`;

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 12px;
  border-radius: 6px;
  margin: 16px 0;
  font-size: 14px;
`;

const SearchResultsContainer = styled.div`
  margin-top: 16px;
`;

const SearchResultItem = styled.div`
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #007bff;
    box-shadow: 0 2px 8px rgba(0, 123, 255, 0.15);
  }
`;

const SearchResultTitle = styled.h4`
  color: #2c3e50;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  line-height: 1.3;
`;

const SearchResultAuthor = styled.div`
  color: #6c757d;
  font-size: 14px;
  margin-bottom: 8px;
`;

const SearchResultJournal = styled.div`
  color: #495057;
  font-size: 13px;
  font-style: italic;
  margin-bottom: 4px;
`;

const SearchResultDOI = styled.div`
  color: #007bff;
  font-size: 12px;
  text-decoration: none;
`;

const CitationEmptyStateContainer = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #6c757d;
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  margin-top: 16px;
`;

const CitationEmptyStateTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
  color: #495057;
`;

const CitationEmptyStateText = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
`;

const CitationManager = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [crossrefResults, setCrossrefResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  // Crossref search function
  const searchCrossref = async (query, filters = {}) => {
    if (!query.trim()) {
      setCrossrefResults([]);
      return;
    }

    setIsLoading(true);
    setSearchError(null);

    try {
      const results = await crossrefService.searchWithFilters(query, {
        type: filterValue || undefined,
        ...filters,
      });
      setCrossrefResults(results);
    } catch (error) {
      setSearchError(error.message);
      setCrossrefResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Search when query or filter changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        searchCrossref(searchQuery);
      } else {
        setCrossrefResults([]);
      }
    }, 500); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [searchQuery, filterValue]);

  const context = useContext(WaxContext);

  const {
    pmViews: { main },
  } = context;

  const handleAddToText = citationData => {
    // Use hash-based ID for ALL citation formats (same content = same ID)
    const citationId = citationDataService.generateCitationId(citationData);

    // Store the citation data in the service
    citationDataService.addCitation(citationId, citationData);

    const citationCalloutType = main.state.schema.nodes.citation_callout;

    const citationCalloutNode = citationCalloutType.create(
      {
        id: citationId,
        class: 'citation-callout',
      },
      main.state.schema.text(citationData.title || 'Citation'),
    );

    // Get current selection position
    const { from } = main.state.selection;

    // Create transaction to insert the citation callout
    const tr = main.state.tr.insert(from, citationCalloutNode);

    // Dispatch the transaction
    main.dispatch(tr);
  };

  const tabs = [
    { id: 'search', label: 'Search' },
    // { id: 'add', label: 'Add Citation' },
    // { id: 'structure', label: 'Structure Citation' },
  ];

  return (
    <CitationManagerContainer>
      <Title>Citation Manager</Title>

      <TabContainer>
        {tabs.map(tab => (
          <Tab
            active={activeTab === tab.id}
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </Tab>
        ))}
      </TabContainer>

      <SearchContainer>
        <SearchInput
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search citations..."
          type="text"
          value={searchQuery}
        />

        {/* <FilterContainer>
          <FilterDropdown
            onChange={e => setFilterValue(e.target.value)}
            value={filterValue}
          >
            <option value="">Filter by label...</option>
            <option value="journal">Journal Articles</option>
            <option value="book">Books</option>
            <option value="website">Websites</option>
            <option value="conference">Conference Papers</option>
          </FilterDropdown>
        </FilterContainer> */}
      </SearchContainer>

      {/* Crossref Search Results */}
      {searchQuery.trim() && (
        <SearchResultsContainer>
          <SectionHeading>Search Results from Crossref</SectionHeading>

          {isLoading && (
            <LoadingSpinner>🔍 Searching Crossref...</LoadingSpinner>
          )}

          {searchError && (
            <ErrorMessage>❌ Search error: {searchError}</ErrorMessage>
          )}

          {!isLoading &&
            !searchError &&
            crossrefResults.length === 0 &&
            searchQuery.trim() && (
              <div
                style={{
                  textAlign: 'center',
                  padding: '20px',
                  color: '#6c757d',
                }}
              >
                No results found for "{searchQuery}"
              </div>
            )}

          {!isLoading && crossrefResults.length > 0 && (
            <div>
              {crossrefResults.map((result, index) => (
                <SearchResultItem
                  key={result.id || index}
                  onClick={() => handleAddToText(result)}
                >
                  <SearchResultTitle>{result.title}</SearchResultTitle>
                  <SearchResultAuthor>
                    {result.author
                      ?.map(
                        author =>
                          `${author.family}${
                            author.given ? `, ${author.given}` : ''
                          }`,
                      )
                      .join('; ') || 'Unknown Author'}
                  </SearchResultAuthor>
                  <SearchResultJournal>
                    {result['container-title']}
                    {result.issued?.['date-parts']?.[0]?.[0] &&
                      ` (${result.issued['date-parts'][0][0]})`}
                    {result.volume && `, Vol. ${result.volume}`}
                    {result.issue && `, Issue ${result.issue}`}
                  </SearchResultJournal>
                  {result.DOI && (
                    <SearchResultDOI>DOI: {result.DOI}</SearchResultDOI>
                  )}
                </SearchResultItem>
              ))}
            </div>
          )}
        </SearchResultsContainer>
      )}

      {crossrefResults.length === 0 && !isLoading && !searchQuery.trim() && (
        <CitationEmptyStateContainer>
          <CitationEmptyStateTitle>
            Search for citations above to add them to your document
          </CitationEmptyStateTitle>
          <CitationEmptyStateText>
            Use the search box to find real academic citations from the Crossref
            database
          </CitationEmptyStateText>
        </CitationEmptyStateContainer>
      )}
    </CitationManagerContainer>
  );
};

export default CitationManager;

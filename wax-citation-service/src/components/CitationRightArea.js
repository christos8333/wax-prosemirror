import React, { useContext, useState } from 'react';
import {
  WaxContext,
  ApplicationContext,
  PortalContext,
} from 'wax-prosemirror-core';
import styled from 'styled-components';
import citationDataService from '../services/CitationDataService';

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

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
`;

const EmptyStateTitle = styled.div`
  color: #2c3e50;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const EmptyStateSubtitle = styled.div`
  color: #6c757d;
  font-size: 14px;
  line-height: 1.4;
`;

const CitationExamplesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CitationExample = styled.div`
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
`;

const CitationStyleTitle = styled.h3`
  color: #2c3e50;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  line-height: 1.3;
`;

const CitationSubtitle = styled.h4`
  color: #495057;
  font-size: 14px;
  font-weight: 500;
  margin: 16px 0 8px 0;
  line-height: 1.3;
`;

const CitationText = styled.div`
  color: #2c3e50;
  font-size: 14px;
  line-height: 1.6;
  font-family: 'Courier New', monospace;
  background: #f8f9fa;
  padding: 12px;
  border-radius: 4px;
  border-left: 3px solid #007bff;
  margin-bottom: 12px;
`;

const AddToTextButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }
`;

const CitationManager = () => {
  const [activeTab, setActiveTab] = useState('search');
  const { citationFormat } = useContext(PortalContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const { app } = useContext(ApplicationContext);
  const context = useContext(WaxContext);

  const {
    pmViews: { main },
    activeView,
  } = context;

  const sampleCitations = [
    {
      id: 'journal-article-1',
      type: 'article-journal',
      title:
        'Collaboration in Virtual Environments: A Study of Remote Team Dynamics',
      author: [
        { family: 'Smith', given: 'John A.' },
        { family: 'Doe', given: 'Rebecca L.' },
      ],
      issued: { 'date-parts': [[2023]] },
      'container-title': 'Journal of Digital Research',
      volume: '15',
      issue: '2',
      page: '123-135',
      DOI: '10.1000/jdr.2023.15.2.123',
    },
    {
      id: 'book-1',
      type: 'book',
      title: 'The Future of Artificial Intelligence in Education',
      author: [{ family: 'Johnson', given: 'Michael' }],
      issued: { 'date-parts': [[2023]] },
      publisher: 'Academic Press',
      'publisher-place': 'Boston, MA',
    },
    {
      id: 'book-chapter-1',
      type: 'chapter',
      title: 'Machine Learning Applications in Healthcare',
      author: [
        { family: 'Williams', given: 'Sarah' },
        { family: 'Brown', given: 'David' },
      ],
      issued: { 'date-parts': [[2023]] },
      'container-title': 'Advances in Medical Technology',
      'container-author': [{ family: 'Davis', given: 'Emma' }],
      publisher: 'Medical Publishers',
      page: '45-67',
    },
    {
      id: 'website-1',
      type: 'webpage',
      title: 'Understanding Climate Change: A Comprehensive Guide',
      author: [{ family: 'Wilson', given: 'Jennifer' }],
      issued: { 'date-parts': [[2023, 6, 15]] },
      URL: 'https://climate-guide.org/understanding-climate-change',
      accessed: { 'date-parts': [[2023, 12, 1]] },
    },
    {
      id: 'conference-1',
      type: 'paper-conference',
      title: 'Blockchain Technology in Supply Chain Management',
      author: [
        { family: 'Garcia', given: 'Carlos' },
        { family: 'Lee', given: 'Amy' },
      ],
      issued: { 'date-parts': [[2023]] },
      'container-title':
        'Proceedings of the International Conference on Technology',
      event: 'International Conference on Technology',
      'event-place': 'San Francisco, CA',
      publisher: 'Tech Conference Publications',
    },
    {
      id: 'thesis-1',
      type: 'thesis',
      title: 'Sustainable Energy Solutions for Rural Communities',
      author: [{ family: 'Anderson', given: 'Robert' }],
      issued: { 'date-parts': [[2023]] },
      'publisher-place': 'Stanford, CA',
      genre: 'PhD dissertation',
      'container-title': 'Stanford University',
    },
    {
      id: 'report-1',
      type: 'report',
      title: 'Global Economic Outlook 2023: Challenges and Opportunities',
      author: [{ family: 'Thompson', given: 'Lisa' }],
      issued: { 'date-parts': [[2023]] },
      publisher: 'World Economic Forum',
      'publisher-place': 'Geneva, Switzerland',
    },
    {
      id: 'newspaper-1',
      type: 'article-newspaper',
      title:
        'The Rise of Remote Work: How Technology is Changing the Workplace',
      author: [{ family: 'Martinez', given: 'Ana' }],
      issued: { 'date-parts': [[2023, 8, 20]] },
      'container-title': 'The New York Times',
      section: 'Business',
      page: 'B1',
    },
    {
      id: 'video-1',
      type: 'video',
      title: 'Introduction to Quantum Computing',
      author: [{ family: 'Kumar', given: 'Raj' }],
      issued: { 'date-parts': [[2023]] },
      URL: 'https://youtube.com/watch?v=quantum-intro',
      'container-title': 'YouTube',
      medium: 'Video',
      duration: '45:30',
    },
    {
      id: 'software-1',
      type: 'software',
      title: 'OpenAI GPT-4: Advanced Language Model',
      author: [{ family: 'OpenAI', given: '' }],
      issued: { 'date-parts': [[2023]] },
      URL: 'https://openai.com/gpt-4',
      version: '4.0',
      medium: 'Computer software',
    },
  ];

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
    { id: 'add', label: 'Add Citation' },
    { id: 'structure', label: 'Structure Citation' },
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

        <FilterContainer>
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
        </FilterContainer>
      </SearchContainer>

      <SectionHeading>Reference List</SectionHeading>

      <CitationExamplesContainer>
        {sampleCitations.map(citation => {
          const getCitationTypeLabel = type => {
            const typeLabels = {
              'article-journal': 'Journal Article',
              book: 'Book',
              chapter: 'Book Chapter',
              webpage: 'Website',
              'paper-conference': 'Conference Paper',
              thesis: 'Thesis/Dissertation',
              report: 'Report',
              'article-newspaper': 'Newspaper Article',
              video: 'Video',
              software: 'Software',
            };
            return typeLabels[type] || 'Citation';
          };

          const formatAuthors = authors => {
            if (!authors || authors.length === 0) return 'Unknown Author';
            if (authors.length === 1) {
              return `${authors[0].family}, ${authors[0].given}`;
            }
            if (authors.length === 2) {
              return `${authors[0].family}, ${authors[0].given} and ${authors[1].family}, ${authors[1].given}`;
            }
            return `${authors[0].family}, ${authors[0].given} et al.`;
          };

          const formatYear = issued => {
            if (issued && issued['date-parts'] && issued['date-parts'][0]) {
              return issued['date-parts'][0][0];
            }
            return 'n.d.';
          };

          const formatCitationText = citation => {
            const authors = formatAuthors(citation.author);
            const year = formatYear(citation.issued);
            const { title } = citation;

            let citationText = `${authors}. ${year}. ${title}`;

            if (citation['container-title']) {
              citationText += `. ${citation['container-title']}`;
            }

            if (citation.publisher) {
              citationText += `. ${citation.publisher}`;
            }

            if (citation.URL) {
              citationText += `. ${citation.URL}`;
            }

            return citationText;
          };

          return (
            <CitationExample key={citation.id}>
              <CitationStyleTitle>
                {getCitationTypeLabel(citation.type)} - {citation.title}
              </CitationStyleTitle>
              <CitationText>{formatCitationText(citation)}</CitationText>
              <AddToTextButton onClick={() => handleAddToText(citation)}>
                Add to Text
              </AddToTextButton>
            </CitationExample>
          );
        })}
      </CitationExamplesContainer>
    </CitationManagerContainer>
  );
};

export default CitationManager;

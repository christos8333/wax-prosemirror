import React, { useContext, useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';

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
  padding: 4px;
  display: flex;
  margin-bottom: 24px;
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

const CitationManager = ({ area, users }) => {
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const handleAddToText = (citationText, style) => {
    console.log(`Adding ${style} citation to text:`, citationText);
    // TODO: Implement actual citation insertion logic
    // This could integrate with ProseMirror to insert the citation at cursor position
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
        <CitationExample>
          <CitationStyleTitle>
            APA (7th edition) – Common in psychology, social sciences
          </CitationStyleTitle>
          <CitationText>
            Smith, J. A., & Doe, R. L. (2020). Collaboration in virtual
            environments. Journal of Digital Research, 15(2), 123–135.
            https://doi.org/10.1000/jdr.2020.15.2.123
          </CitationText>
          <AddToTextButton
            onClick={() =>
              handleAddToText(
                'Smith, J. A., & Doe, R. L. (2020). Collaboration in virtual environments. Journal of Digital Research, 15(2), 123–135. https://doi.org/10.1000/jdr.2020.15.2.123',
                'APA',
              )
            }
          >
            Add to Text
          </AddToTextButton>
        </CitationExample>

        <CitationExample>
          <CitationStyleTitle>
            MLA (9th edition) – Common in humanities, literature
          </CitationStyleTitle>
          <CitationText>
            Smith, John A., and Rebecca L. Doe. "Collaboration in Virtual
            Environments." Journal of Digital Research, vol. 15, no. 2, 2020,
            pp. 123–135. DOI:10.1000/jdr.2020.15.2.123.
          </CitationText>
          <AddToTextButton
            onClick={() =>
              handleAddToText(
                'Smith, John A., and Rebecca L. Doe. "Collaboration in Virtual Environments." Journal of Digital Research, vol. 15, no. 2, 2020, pp. 123–135. DOI:10.1000/jdr.2020.15.2.123.',
                'MLA',
              )
            }
          >
            Add to Text
          </AddToTextButton>
        </CitationExample>

        <CitationExample>
          <CitationStyleTitle>
            Chicago (17th edition) – Used in history, arts, publishing
          </CitationStyleTitle>
          <CitationSubtitle>
            Notes & Bibliography style (humanities):
          </CitationSubtitle>
          <CitationText>
            John A. Smith and Rebecca L. Doe, "Collaboration in Virtual
            Environments," Journal of Digital Research 15, no. 2 (2020): 123–35.
            https://doi.org/10.1000/jdr.2020.15.2.123.
          </CitationText>
          <AddToTextButton
            onClick={() =>
              handleAddToText(
                'John A. Smith and Rebecca L. Doe, "Collaboration in Virtual Environments," Journal of Digital Research 15, no. 2 (2020): 123–35. https://doi.org/10.1000/jdr.2020.15.2.123.',
                'Chicago Notes & Bibliography',
              )
            }
          >
            Add to Text
          </AddToTextButton>
          <CitationSubtitle>
            Author–Date style (sciences, social sciences):
          </CitationSubtitle>
          <CitationText>
            Smith, John A., and Rebecca L. Doe. 2020. "Collaboration in Virtual
            Environments." Journal of Digital Research 15 (2): 123–35.
            https://doi.org/10.1000/jdr.2020.15.2.123.
          </CitationText>
          <AddToTextButton
            onClick={() =>
              handleAddToText(
                'Smith, John A., and Rebecca L. Doe. 2020. "Collaboration in Virtual Environments." Journal of Digital Research 15 (2): 123–35. https://doi.org/10.1000/jdr.2020.15.2.123.',
                'Chicago Author-Date',
              )
            }
          >
            Add to Text
          </AddToTextButton>
        </CitationExample>

        <CitationExample>
          <CitationStyleTitle>
            IEEE – Common in engineering, computer science
          </CitationStyleTitle>
          <CitationText>
            [1] J. A. Smith and R. L. Doe, "Collaboration in virtual
            environments," Journal of Digital Research, vol. 15, no. 2, pp.
            123–135, 2020, doi: 10.1000/jdr.2020.15.2.123.
          </CitationText>
          <AddToTextButton
            onClick={() =>
              handleAddToText(
                '[1] J. A. Smith and R. L. Doe, "Collaboration in virtual environments," Journal of Digital Research, vol. 15, no. 2, pp. 123–135, 2020, doi: 10.1000/jdr.2020.15.2.123.',
                'IEEE',
              )
            }
          >
            Add to Text
          </AddToTextButton>
        </CitationExample>

        <CitationExample>
          <CitationStyleTitle>
            Harvard – Common in UK, social sciences, business
          </CitationStyleTitle>
          <CitationText>
            Smith, J.A. and Doe, R.L., 2020. Collaboration in virtual
            environments. Journal of Digital Research, 15(2), pp.123–135.
            https://doi.org/10.1000/jdr.2020.15.2.123
          </CitationText>
          <AddToTextButton
            onClick={() =>
              handleAddToText(
                'Smith, J.A. and Doe, R.L., 2020. Collaboration in virtual environments. Journal of Digital Research, 15(2), pp.123–135. https://doi.org/10.1000/jdr.2020.15.2.123',
                'Harvard',
              )
            }
          >
            Add to Text
          </AddToTextButton>
        </CitationExample>
      </CitationExamplesContainer>
    </CitationManagerContainer>
  );
};

export default CitationManager;

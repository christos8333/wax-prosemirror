import React, { useContext } from 'react';
import styled from 'styled-components';
import { PortalContext } from 'wax-prosemirror-core';

const CitationListWrapper = styled.div`
  border: 1px solid black;
  margin-top: 20px;
  padding: 20px;
  width: 100%;
`;

const CitationFooterList = () => {
  const { citationFormat } = useContext(PortalContext);
  
  const citations = [
    {
    id: 'ITEM-1',
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
  }
  ];

  const formatCitation = (citation) => {
    if (citationFormat === 'APA') {
      // APA format: Author, A. (Year). Title. Publisher.
      const author = citation.author[0];
      const year = citation.issued && citation.issued['date-parts'] 
        ? citation.issued['date-parts'][0][0] 
        : 'n.d.';
      return `${author.family}, ${author.given} (${year}). ${citation.title}. ${citation.publisher}.`;
    }
    
    if (citationFormat === 'MLA') {
      // MLA format: Author, First Name. Title. Publisher, Year.
      const author = citation.author[0];
      const year = citation.issued && citation.issued['date-parts'] 
        ? citation.issued['date-parts'][0][0] 
        : 'n.d.';
      return `${author.family}, ${author.given}. ${citation.title}. ${citation.publisher}, ${year}.`;
    }
    
    if (citationFormat === 'Chicago') {
      // Chicago Author-Date format: Author, First Name. Year. Title. Publisher.
      const author = citation.author[0];
      const year = citation.issued && citation.issued['date-parts'] 
        ? citation.issued['date-parts'][0][0] 
        : 'n.d.';
      return `${author.family}, ${author.given}. ${year}. ${citation.title}. ${citation.publisher}.`;
    }
    
    // Default format for other styles
    return `${citation.author[0].family}, ${citation.author[0].given}. ${citation.title}.`;
  };

  const getHeading = () => {
    switch (citationFormat) {
      case 'MLA':
        return 'Works Cited';
      case 'APA':
        return 'References';
      case 'Chicago':
        return 'References';
      default:
        return 'References';
    }
  };

  return (
    <CitationListWrapper>
      <h1>{getHeading()}</h1>
      <ul>
        {citations.map((citation, index) => (
          <li key={citation.id}>
            {formatCitation(citation)}
          </li>
        ))}
      </ul>
    </CitationListWrapper>
  );
};

export default CitationFooterList;

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
  
  // Sample citation data - in real implementation, this would come from your citation service
  const citations = [
    {
      id: 'ITEM-1',
      author: [{ family: 'Smith', given: 'J.' }],
      issued: { 'date-parts': [[2020]] },
      title: 'The example book',
      publisher: 'Example Publisher',
      type: 'book'
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
    
    // Default format for other styles
    return `${citation.author[0].family}, ${citation.author[0].given}. ${citation.title}.`;
  };

  return (
    <CitationListWrapper>
      <h1>References</h1>
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

import React from 'react';
import styled from 'styled-components';

const CitationListWrapper = styled.div`
  border: 1px solid black;
  margin-top: 20px;
  padding: 20px;
  width: 100%;
`;

const CitationFooterList = () => {
  return (
    <CitationListWrapper>
      <h1>Citations</h1>
      <ul>
        <li>1. citation 1</li>
        <li>2. citation 2</li>
        <li>3. citation 3</li>
        <li>4. citation 4</li>
      </ul>
    </CitationListWrapper>
  );
};

export default CitationFooterList;

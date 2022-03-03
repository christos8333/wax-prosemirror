/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import ContainerEditor from './ContainerEditor';
import FeedbackComponent from './FeedbackComponent';

const FillTheGapContainer = styled.div`
  margin-bottom: 15px;
  margin-top: 10px;
`;

export default ({ node, view, getPos }) => {
  return (
    <FillTheGapContainer>
      <span>Fill The Gap</span>
      <ContainerEditor getPos={getPos} node={node} view={view} />
      <FeedbackComponent getPos={getPos} node={node} view={view} />
    </FillTheGapContainer>
  );
};

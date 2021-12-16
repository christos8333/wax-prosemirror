/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import EditorComponent from './EditorComponent';
import FeedBackComponent from './FeedBackComponent';

const EssayWrapper = styled.div`
  border: 3px solid #f5f5f7;
  height: auto;
  padding: 10px;
  .ProseMirror {
    padding: 5px !important;
    box-shadow: none !important;
  }
`;

export default ({ node, view, getPos }) => {
  return (
    <>
      <span>Essay</span>
      <EssayWrapper>
        <EditorComponent getPos={getPos} node={node} view={view} />
        <FeedBackComponent getPos={getPos} node={node} view={view} />
      </EssayWrapper>
    </>
  );
};

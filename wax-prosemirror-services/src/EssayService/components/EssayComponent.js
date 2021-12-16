/* eslint-disable react/prop-types */
import React from 'react';
import EditorComponent from './EditorComponent';
import FeedBackComponent from './FeedBackComponent';

export default ({ node, view, getPos }) => {
  return (
    <>
      <EditorComponent getPos={getPos} node={node} view={view} />
      <FeedBackComponent getPos={getPos} node={node} view={view} />
    </>
  );
};

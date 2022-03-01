/* eslint-disable react/prop-types */
import React from 'react';
import EditorComponent from './EditorComponent';

export default ({ node, view, getPos }) => {
  return (
    <>
      <EditorComponent getPos={getPos} node={node} view={view} />
      <div>feedback</div>
    </>
  );
};

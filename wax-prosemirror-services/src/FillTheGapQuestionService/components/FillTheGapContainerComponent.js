/* eslint-disable react/prop-types */
import React from 'react';
import ContainerEditor from './ContainerEditor';

export default ({ node, view, getPos }) => {
  return (
    <>
      <ContainerEditor getPos={getPos} node={node} view={view} />
      <div>feedback</div>
    </>
  );
};

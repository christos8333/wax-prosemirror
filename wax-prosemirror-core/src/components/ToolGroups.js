/* eslint no-underscore-dangle: 0 */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import ToolGroupComponent from './ToolGroupComponent';

const ToolGroups = ({ toolGroups, view }) => {
  return toolGroups.map(toolGroup => {
    if (toolGroup._toolGroups.length > 0) {
      return <ToolGroups toolGroups={toolGroup._toolGroups} view={view} />;
    }
    return (
      <ToolGroupComponent key={uuidv4()} tools={toolGroup._tools} view={view} />
    );
  });
};

export default ToolGroups;

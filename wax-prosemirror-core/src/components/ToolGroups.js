/* eslint no-underscore-dangle: 0 */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import ToolGroupComponent from './ToolGroupComponent';

const ToolGroups = ({ toolGroups, state }) => {
  console.log(state, 'tool groups ');
  return toolGroups.map(toolGroup => {
    if (toolGroup._toolGroups.length > 0) {
      return <ToolGroups toolGroups={toolGroup._toolGroups} state={state} />;
    }
    return (
      <ToolGroupComponent
        key={uuidv4()}
        tools={toolGroup._tools}
        state={state}
      />
    );
  });
};

export default ToolGroups;

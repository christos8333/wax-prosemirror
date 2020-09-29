/* eslint no-underscore-dangle: 0 */
/* eslint react/prop-types: 0 */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import ToolGroupComponent from './ToolGroupComponent';

const ToolGroups = ({ toolGroups, view }) => {
  return toolGroups.map(toolGroup => {
    if (toolGroup._toolGroups.length > 0) {
      return <ToolGroups toolGroups={toolGroup._toolGroups} view={view} />;
    }
    return (
      <ToolGroupComponent
        key={uuidv4()}
        view={view}
        tools={toolGroup._tools}
        // title={this.title}
        // name={name}
      />
    );
  });
};

export default ToolGroups;

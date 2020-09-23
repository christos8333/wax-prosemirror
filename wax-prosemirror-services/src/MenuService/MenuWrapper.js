/* eslint no-underscore-dangle: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { map } from 'lodash';
import { ToolGroupComponent, ToolGroups } from 'wax-prosemirror-components';

const MainMenuBar = ({ items = [], view }) => {
  return (
    <>
      {map(items, item => {
        if (item._toolGroups && item._toolGroups.length > 0) {
          return <ToolGroups toolGroups={item._toolGroups} view={view} />;
        }
        return (
          <ToolGroupComponent
            key={uuidv4()}
            view={view}
            tools={item._tools}
            // title={this.title}
            // name={name}
          />
        );
      })}
    </>
  );
};

export default MainMenuBar;

/* eslint no-underscore-dangle: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { map } from 'lodash';
import { ToolGroupComponent, ToolGroups } from 'wax-prosemirror-components';

const MainMenuBar = ({ items = [], view }) => {
  return <>{map(items, item => item.renderTools(view))}</>;
};

export default MainMenuBar;

/* eslint no-underscore-dangle: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { map } from 'lodash';

const MainMenuBar = ({ items = [], state }) => {
  return <>{map(items, item => item.renderTools(state))}</>;
};

export default MainMenuBar;

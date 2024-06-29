/* eslint no-underscore-dangle: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { map } from 'lodash';

const MainMenuBar = ({ items = [], view }) => {

  console.log('MainMenuBar')
  return <>{map(items, item => item.renderTools(view))}</>;
};

export default MainMenuBar;

/* eslint react/prop-types: 0 */

import React, { useState } from 'react';
import styled from 'styled-components';
import { grid, th } from '@pubsweet/ui-toolkit';
import Icon from '../../helpers/Icon';
import FindComponent from './FindComponent';
import ExandedFindAndReplaceComponent from './ExandedFindAndReplaceComponent';

const FindAndReplaceComponent = ({ close }) => {
  const [isExpanded, setExpanded] = useState(false);

  const expand = () => {
    setExpanded(!isExpanded);
  };

  return isExpanded ? (
    <ExandedFindAndReplaceComponent close={close} />
  ) : (
    <FindComponent close={close} expand={expand} />
  );
};

export default FindAndReplaceComponent;

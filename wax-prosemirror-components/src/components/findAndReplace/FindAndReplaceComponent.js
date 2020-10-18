/* eslint react/prop-types: 0 */
import React, { useState } from 'react';
import FindComponent from './FindComponent';
import ExandedFindAndReplaceComponent from './ExandedFindAndReplaceComponent';

const FindAndReplaceComponent = ({ close }) => {
  const [isExpanded, setExpanded] = useState(false);

  const expand = () => {
    setExpanded(true);
  };

  const getNonExpandedText = () => {};

  return isExpanded ? (
    <ExandedFindAndReplaceComponent close={close} previousText="" />
  ) : (
    <FindComponent close={close} expand={expand} />
  );
};

export default FindAndReplaceComponent;

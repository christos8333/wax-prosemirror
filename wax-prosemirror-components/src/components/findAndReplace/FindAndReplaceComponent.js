/* eslint react/prop-types: 0 */
import React, { useState } from 'react';
import FindComponent from './FindComponent';
import ExandedFindAndReplaceComponent from './ExandedFindAndReplaceComponent';

const FindAndReplaceComponent = ({ close }) => {
  const [isExpanded, setExpanded] = useState(false);
  const [nonExpandedText, SetnonExpandedText] = useState('');
  const expand = () => {
    setExpanded(true);
  };

  const getNonExpandedText = searcString => {
    SetnonExpandedText(searcString);
  };

  return isExpanded ? (
    <ExandedFindAndReplaceComponent
      close={close}
      nonExpandedText={nonExpandedText}
    />
  ) : (
    <FindComponent
      close={close}
      expand={expand}
      setPreviousSearcValue={getNonExpandedText}
    />
  );
};

export default FindAndReplaceComponent;

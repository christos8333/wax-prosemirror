/* eslint react/prop-types: 0 */
import React, { useState } from 'react';
import FindComponent from './FindComponent';
import ExandedFindAndReplaceComponent from './ExandedFindAndReplaceComponent';

const FindAndReplaceComponent = ({ close }) => {
  const [isExpanded, setExpanded] = useState(false);
  const [nonExpandedText, setNonExpandedText] = useState('');
  const [matchCaseOption, setMatchCaseOption] = useState(false);
  const expand = () => {
    setExpanded(true);
  };

  const getNonExpandedText = searcString => {
    setNonExpandedText(searcString);
  };

  const getMatchCaseOption = matchCase => {
    setMatchCaseOption(matchCase);
  };

  const FindNextMatch = nextMatch => {
    return nextMatch;
  };

  return isExpanded ? (
    <ExandedFindAndReplaceComponent
      close={close}
      matchCaseOption={matchCaseOption}
      nonExpandedText={nonExpandedText}
    />
  ) : (
    <FindComponent
      close={close}
      expand={expand}
      setMatchCaseValue={getMatchCaseOption}
      setPreviousSearcValue={getNonExpandedText}
      FindNextMatch={FindNextMatch}
    />
  );
};

export default FindAndReplaceComponent;

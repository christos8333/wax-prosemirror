/* eslint react/prop-types: 0 */

import React, { useState, useRef, useContext, useEffect } from 'react';
import { each, eachRight } from 'lodash';
import styled from 'styled-components';
import { grid } from '@pubsweet/ui-toolkit';
import { WaxContext, useDebounce, Icon } from 'wax-prosemirror-core';
import helpers from './helpers';

const Wrapper = styled.div`
  background: #fff;
  border-radius: 1.03093% / 8%;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px 0px,
    rgba(9, 30, 66, 0.31) 0px 0px 1px 0px;
  padding: ${grid(2)};
  transform-origin: 50% 50% 0px;
  width: 400px;
`;

const SingleRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const SearchInputWrapper = styled.div`
  width: 266px;
`;

const SearchInput = styled.input`
  border: none;
  border-radius: 2px;
  box-shadow: inset 0 0 0 1px rgba(27, 43, 75, 0.28);
  font-size: 15px;
  font-weight: 400;
  padding: ${grid(1)} ${grid(10)} ${grid(1)} ${grid(1)};
  width: 100%;

  ::placeholder {
    color: #d8dae0;
  }

  &:focus {
    outline: none;
  }
`;

const ControlsWrapper = styled.div`
  display: flex;
  margin-left: auto;
  width: 126px;
`;

const CounterInput = styled.span`
  font-size: 12px;
  position: absolute;
  right: 141px;
  -webkit-text-fill-color: rgba(27, 43, 75, 0.28);
  top: 13px;
  z-index: 1;
`;

const StyledIcon = styled(Icon)`
  cursor: pointer;
  height: 24px;
  width: 24px;
`;

const CloseWrapper = styled.div`
  border-left: 1px solid #e0e2e7;
  margin-left: 1%;
`;

const IconWrapper = styled.span`
  &:focus {
    outline: none;
  }
`;

const ExpandedWrapper = styled.div`
  pointer-events: ${props => (props.isDisabled ? 'none' : '')};
`;

const StyledIconMore = styled(Icon)`
  cursor: ${props => (props.isDisabled ? 'not-allowed' : 'pointer')};
  height: 24px;
  opacity: ${props => (props.isDisabled ? '0.4' : '1')};
  width: 24px;
`;

const Svg = styled.svg.attrs(() => ({
  version: '1.1',
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink',
}))`
  background: ${props => (props.active ? '#535E76' : 'white')};
  cursor: pointer;
  fill: ${props => (props.active ? 'white' : '#535E76')};
  height: 24px;
  padding: 2px;
  vertical-align: top;
  width: 24px;
`;

const FindComponent = ({
  close,
  expand,
  setPreviousSearcValue,
  setMatchCaseValue,
  findNextMatch,
  findPreviousMatch,
}) => {
  const {
    app,
    pmViews,
    activeViewId,
    pmViews: { main },
  } = useContext(WaxContext);
  const searchRef = useRef(null);

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const [searchValue, setSearchValue] = useState('');
  const [counterText, setCounterText] = useState('0 of 0');
  const [matchCaseSearch, setMatchCaseSearch] = useState(false);
  const findAndReplacePlugin = app.PmPlugins.get('findAndReplacePlugin');
  const [isFirstRun, setFirstRun] = useState(true);

  const allStates = [];

  const debouncedSearchTerm = useDebounce(searchValue, 300);

  each(pmViews, singleView => {
    allStates.push(singleView.state);
  });

  const onChange = () => {
    setSearchValue(searchRef.current.value);
  };

  useEffect(() => {
    searchDocument();
    if (isFirstRun) {
      setTimeout(() => {
        searchRef.current.focus();
        setFirstRun(false);
      });
    }
  }, [debouncedSearchTerm, matchCaseSearch, JSON.stringify(allStates)]);

  const setCounterSearches = counter => {
    if (counter === 0) return setCounterText('0 of 0');
    setCounterText(`0 of ${counter}`);

    const {
      state: {
        selection: { from, to },
      },
    } = pmViews[activeViewId];

    const results = helpers.getAllResultsByView(
      pmViews,
      searchValue,
      matchCaseSearch,
    );
    const resultsFrom = helpers.getResultsFrom(results);
    let counterMatch = 0;
    if (activeViewId === 'main') {
      const match = results.main.filter(result => {
        return from === result.from && to === result.to;
      });

      if (match.length === 1) {
        setCounterText(`${resultsFrom.main.indexOf(from) + 1} of ${counter}`);
      }
    } else {
      if (resultsFrom.main) counterMatch = resultsFrom.main.length;
      const notesIds = helpers.getNotesIds(pmViews.main);

      for (let i = 0; i < notesIds.length; i += 1) {
        if (resultsFrom[notesIds[i]] && activeViewId !== notesIds[i]) {
          counterMatch += resultsFrom[notesIds[i]].length;
        }
        if (resultsFrom[notesIds[i]] && activeViewId === notesIds[i]) {
          const match = results[notesIds[i]].filter(result => {
            return from === result.from && to === result.to;
          });

          if (match.length === 1) {
            counterMatch += resultsFrom[notesIds[i]].indexOf(from) + 1;
            setCounterText(`${counterMatch} of ${counter}`);
          }
          break;
        }
      }
    }
  };

  const searchDocument = () => {
    let counter = 0;
    findAndReplacePlugin.props.setSearchText(searchValue);

    findAndReplacePlugin.props.setSearchMatchCase(matchCaseSearch);
    counter = helpers.getMatchesByView(pmViews, searchValue, matchCaseSearch);

    setCounterSearches(counter);

    if (searchRef.current === document.activeElement) {
      eachRight(pmViews, singleView => {
        singleView.dispatch(singleView.state.tr);
      });
    }
  };

  const closeFind = () => {
    findAndReplacePlugin.props.setSearchText('');
    each(pmViews, singleView => {
      singleView.dispatch(singleView.state.tr);
    });
    close();
  };

  const showExpanded = () => {
    expand();
    setPreviousSearcValue(searchValue);
  };

  const matchCase = () => {
    setMatchCaseSearch(!matchCaseSearch);
    setMatchCaseValue(!matchCaseSearch);
    searchRef.current.focus();
  };

  return (
    <Wrapper>
      <SingleRow>
        <SearchInputWrapper>
          <SearchInput
            onChange={onChange}
            placeholder="Find"
            ref={searchRef}
            type="text"
            value={searchValue}
          />
          <CounterInput> {counterText} </CounterInput>
        </SearchInputWrapper>
        <ControlsWrapper>
          <IconWrapper onClick={matchCase} role="button" tabIndex="0">
            <Svg active={matchCaseSearch} fill="none" viewBox="0 0 24 24">
              <title> Match Case </title>
              <path d="M2.5,4v3h5v12h3V7h5V4H2.5z M21.5,9h-9v3h3v7h3v-7h3V9z" />
            </Svg>
          </IconWrapper>
          <IconWrapper
            onClick={() => findPreviousMatch(searchValue, matchCaseSearch)}
            role="button"
            tabIndex="0"
          >
            <StyledIcon name="navigatePrevious" />
          </IconWrapper>
          <IconWrapper
            onClick={() => findNextMatch(searchValue, matchCaseSearch)}
            role="button"
            tabIndex="0"
          >
            <StyledIcon name="navigateNext" />
          </IconWrapper>

          <ExpandedWrapper isDisabled={!isEditable} onClick={showExpanded}>
            <StyledIconMore isDisabled={!isEditable} name="more" />
          </ExpandedWrapper>

          <CloseWrapper onClick={closeFind}>
            <StyledIcon name="close" />
          </CloseWrapper>
        </ControlsWrapper>
      </SingleRow>
    </Wrapper>
  );
};

export default FindComponent;

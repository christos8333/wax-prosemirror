/* eslint react/prop-types: 0 */

import React, {
  useState,
  useRef,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import { TextSelection } from 'prosemirror-state';
import { debounce, each, eachRight } from 'lodash';
import styled from 'styled-components';
import { grid } from '@pubsweet/ui-toolkit';
import { WaxContext } from 'wax-prosemirror-core';
import Icon from '../../helpers/Icon';
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
`;

const SearchInputWrapper = styled.div`
  width: 75%;
`;

const SearchInput = styled.input`
  border: none;
  border-radius: 2px;
  box-shadow: inset 0 0 0 1px rgba(27, 43, 75, 0.28);
  font-size: 15px;
  font-weight: 400;
  padding: ${grid(1)} ${grid(10)} ${grid(1)} ${grid(1)};
  width: 78%;

  ::placeholder {
    color: #d8dae0;
  }

  &:focus {
    outline: none;
  }
`;

const CounterInput = styled.span`
  font-size: 12px;
  position: absolute;
  right: 155px;
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

const ExpandedWrapper = styled.div``;

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

const FindComponent = ({ close, expand, setPreviousSearcValue }) => {
  const { app, view, activeViewId } = useContext(WaxContext);
  const searchRef = useRef(null);
  const [lastActiveViewId, setlastActiveViewId] = useState();
  const [lastSelection, setLastSelection] = useState();

  const [searchValue, setSearchValue] = useState('');
  const [counterText, setCounterText] = useState('0 of 0');
  const [matchCaseSearch, setMatchCaseSearch] = useState(false);
  const findAndReplacePlugin = app.PmPlugins.get('findAndReplacePlugin');
  const [isFirstRun, setFirstRun] = useState(true);

  const allStates = [];

  each(view, (singleView, viewId) => {
    allStates.push(singleView.state);
  });

  const delayedSearch = useCallback(
    debounce(() => searchDocument(), 300),
    [searchValue, matchCaseSearch],
  );

  const onChange = () => {
    setSearchValue(searchRef.current.value);
  };

  useEffect(() => {
    if (view[activeViewId].state.selection.from !== 0) {
      setLastSelection(view[activeViewId].state.selection);
      setlastActiveViewId(activeViewId);
    }
    delayedSearch();
    if (isFirstRun) {
      setTimeout(() => {
        searchRef.current.focus();
        setFirstRun(false);
      });
    }
  }, [searchValue, delayedSearch, matchCaseSearch, JSON.stringify(allStates)]);

  const searchDocument = () => {
    setCounterText('0 of 0');
    let counter = 0;
    findAndReplacePlugin.props.setSearchText(searchValue);
    findAndReplacePlugin.props.setSearchMatchCase(matchCaseSearch);
    counter = helpers.getMatchesByView(view, searchValue, matchCaseSearch);

    if (counter > 0) setCounterText(`1 of ${counter}`);

    if (searchRef.current === document.activeElement) {
      eachRight(view, (singleView, viewId) => {
        singleView.dispatch(singleView.state.tr);
      });
    }
  };

  const closeFind = () => {
    findAndReplacePlugin.props.setSearchText('');
    each(view, (singleView, viewId) => {
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
    searchRef.current.focus();
  };

  const getAllResultsByView = () => {
    const allResults = {};

    each(view, (singleView, viewId) => {
      if (!allResults[viewId]) {
        allResults[viewId] = helpers.findMatches(
          singleView.state.doc,
          searchValue,
          matchCaseSearch,
        );
      }
    });
    return allResults;
  };

  const closest = (selectionFrom, results, greater = true) => {
    return results.reduce((a, b) => {
      const greatherSmaller = greater ? a > b : a < b;
      const aDiff = Math.abs(a - selectionFrom);
      const bDiff = Math.abs(b - selectionFrom);

      if (aDiff === bDiff) {
        return greatherSmaller ? a : b;
      }
      return bDiff < aDiff ? b : a;
    });
  };

  const findNext = () => {
    view[lastActiveViewId].focus();
    const results = getAllResultsByView();
    const resultsFrom = {};

    each(results, (result, viewId) => {
      result.forEach(res => {
        if (!resultsFrom[viewId]) {
          resultsFrom[viewId] = [res.from];
        } else {
          resultsFrom[viewId].push(res.from);
        }
      });
    });

    const found = closest(lastSelection.from, resultsFrom[lastActiveViewId]);
    let position = resultsFrom[lastActiveViewId].indexOf(found);
    if (lastSelection.from >= found) position += 1;
    const selectionFrom = new TextSelection(
      view[lastActiveViewId].state.doc.resolve(
        results[lastActiveViewId][position].from,
      ),
    );

    const selectionTo = new TextSelection(
      view[lastActiveViewId].state.doc.resolve(
        results[lastActiveViewId][position].to,
      ),
    );

    view[lastActiveViewId].dispatch(
      view[lastActiveViewId].state.tr.setSelection(
        TextSelection.between(selectionFrom.$anchor, selectionTo.$head),
      ),
    );

    view[lastActiveViewId].dispatch(
      view[lastActiveViewId].state.tr.scrollIntoView(),
    );
  };

  const findPrevious = () => {
    view[lastActiveViewId].focus();
    const results = getAllResultsByView();
    const resultsFrom = {};

    each(results, (result, viewId) => {
      result.forEach(res => {
        if (!resultsFrom[viewId]) {
          resultsFrom[viewId] = [res.from];
        } else {
          resultsFrom[viewId].push(res.from);
        }
      });
    });

    const found = closest(
      lastSelection.from,
      resultsFrom[lastActiveViewId],
      false,
    );
    let position = resultsFrom[lastActiveViewId].indexOf(found);
    if (lastSelection.from <= found) position -= 1;
    const selectionFrom = new TextSelection(
      view[lastActiveViewId].state.doc.resolve(
        results[lastActiveViewId][position].from,
      ),
    );

    const selectionTo = new TextSelection(
      view[lastActiveViewId].state.doc.resolve(
        results[lastActiveViewId][position].to,
      ),
    );

    view[lastActiveViewId].dispatch(
      view[lastActiveViewId].state.tr.setSelection(
        TextSelection.between(selectionFrom.$anchor, selectionTo.$head),
      ),
    );

    view[lastActiveViewId].dispatch(
      view[lastActiveViewId].state.tr.scrollIntoView(),
    );
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
        <IconWrapper onClick={matchCase} role="button" tabIndex="0">
          <Svg active={matchCaseSearch} fill="none" viewBox="0 0 24 24">
            <title> Match Case </title>
            <path d="M2.5,4v3h5v12h3V7h5V4H2.5z M21.5,9h-9v3h3v7h3v-7h3V9z" />
          </Svg>
        </IconWrapper>
        <IconWrapper onClick={findPrevious} role="button" tabIndex="0">
          <StyledIcon name="navigatePrevious" />
        </IconWrapper>
        <IconWrapper onClick={findNext} role="button" tabIndex="0">
          <StyledIcon name="navigateNext" />
        </IconWrapper>

        <ExpandedWrapper onClick={showExpanded}>
          <StyledIcon name="more" />
        </ExpandedWrapper>

        <CloseWrapper onClick={closeFind}>
          <StyledIcon name="close" />
        </CloseWrapper>
      </SingleRow>
    </Wrapper>
  );
};

export default FindComponent;

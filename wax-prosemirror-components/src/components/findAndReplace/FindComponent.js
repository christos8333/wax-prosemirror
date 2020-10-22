/* eslint react/prop-types: 0 */

import React, {
  useState,
  useRef,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import { debounce, each } from 'lodash';
import styled from 'styled-components';
import { grid } from '@pubsweet/ui-toolkit';
import { WaxContext } from 'wax-prosemirror-core';
import Icon from '../../helpers/Icon';
import helpers from './helpers';

const Wrapper = styled.div`
  width: 400px;
  background: #fff;
  border-radius: 1.03093% / 8%;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px 0px,
    rgba(9, 30, 66, 0.31) 0px 0px 1px 0px;
  transform-origin: 50% 50% 0px;
  padding: ${grid(2)};
`;

const SingleRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const SearchInputWrapper = styled.div`
  width: 75%;
`;

const SearchInput = styled.input`
  font-size: 15px;
  font-weight: 400;
  border-radius: 2px;
  border: none;
  padding: ${grid(1)} ${grid(10)} ${grid(1)} ${grid(1)};
  width: 85%;
  box-shadow: inset 0 0 0 1px rgba(27, 43, 75, 0.28);
  ::placeholder {
    color: #d8dae0;
  }
  &:focus {
    outline: none;
  }
`;

const CounterInput = styled.span`
  position: absolute;
  right: 115px;
  top: 13px;
  z-index: 1;
  font-size: 12px;
  -webkit-text-fill-color: rgba(27, 43, 75, 0.28);
`;

const StyledIcon = styled(Icon)`
  height: 24px;
  width: 24px;
  cursor: pointer;
`;

const CloseWrapper = styled.div`
  border-left: 1px solid #e0e2e7;
  margin-left: 1%;
`;

const PreviousNextButton = styled.span`
  &:focus {
    outline: none;
  }
`;

const ExpandedWrapper = styled.div``;

const FindComponent = ({ close, expand, setPreviousSearcValue }) => {
  const { app, view } = useContext(WaxContext);

  const searchRef = useRef(null);
  const [searchValue, setSearchValue] = useState('');
  const [counterText, setCounterText] = useState('0 of 0');
  const findAndReplacePlugin = app.PmPlugins.get('findAndReplacePlugin');
  const [isFirstRun, setFirstRun] = useState(true);
  const allStates = [];

  each(view, (singleView, viewId) => {
    allStates.push(singleView.state);
  });

  const delayedSearch = useCallback(
    debounce(() => searchDocument(), 300),
    [searchValue],
  );

  const onChange = () => {
    setSearchValue(searchRef.current.value);
  };

  useEffect(() => {
    delayedSearch();
    if (isFirstRun) {
      setTimeout(() => {
        searchRef.current.focus();
        setFirstRun(false);
      });
    }
  }, [searchValue, delayedSearch, JSON.stringify(allStates)]);

  const searchDocument = () => {
    setCounterText('0 of 0');
    let counter = 0;
    findAndReplacePlugin.props.setSearchText(searchValue);
    counter = helpers.getMatchesByView(view, searchValue);

    if (counter > 0) setCounterText(`1 of ${counter}`);

    if (searchRef.current === document.activeElement) {
      each(view, (singleView, viewId) => {
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

  const findNext = () => {
    console.log('next');
  };

  const findPrevious = () => {
    console.log('previous');
  };

  return (
    <Wrapper>
      <SingleRow>
        <SearchInputWrapper>
          <SearchInput
            ref={searchRef}
            type="text"
            placeholder="Find"
            value={searchValue}
            onChange={onChange}
          />
          <CounterInput> {counterText} </CounterInput>
        </SearchInputWrapper>
        <PreviousNextButton onClick={findPrevious} role="button" tabIndex="0">
          <StyledIcon name="navigatePrevious" />
        </PreviousNextButton>
        <PreviousNextButton onClick={findNext} role="button" tabIndex="0">
          <StyledIcon name="navigateNext" />
        </PreviousNextButton>

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

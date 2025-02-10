/* eslint react/prop-types: 0 */
import React, { useState, useRef, useContext, useEffect } from 'react';
import { each, eachRight, isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import {
  WaxContext,
  ApplicationContext,
  DocumentHelpers,
  useDebounce,
  Icon,
} from 'wax-prosemirror-core';
import styled from 'styled-components';
import { grid, th } from '@pubsweet/ui-toolkit';
import CheckBox from './CheckBox';
import helpers from './helpers';

const Wrapper = styled.div`
  background: #fff;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px 0px,
    rgba(9, 30, 66, 0.31) 0px 0px 1px 0px;
  font-family: ${th('fontTools')};
  font-size: 15px;
  height: 300px;
  padding: ${grid(2)};
  transform-origin: 50% 50% 0px;
  width: 400px;
`;

const FindTitle = styled.span`
  color: #4b5871;
  font-size: 16px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const InputLabel = styled.div`
  color: #4b5871;
  font-size: 16px;
  padding: ${grid(2)} ${grid(0)} ${grid(2)} ${grid(0)};
`;

const InputWrapper = styled.div`
  display: flex;

  #search-input {
    padding: ${grid(1)} ${grid(11)} ${grid(1)} ${grid(1)};
  }
`;

const FindReplaceInput = styled.input`
  border: none;
  box-shadow: inset 0 0 0 1px rgba(27, 43, 75, 0.28);
  display: flex;
  flex-grow: 1;
  font-size: 15px;
  font-weight: 400;
  padding: ${grid(1)};

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
  right: 19px;
  -webkit-text-fill-color: rgba(27, 43, 75, 0.28);
  top: 69px;
  z-index: 1;
`;

const StyledIcon = styled(Icon)`
  cursor: pointer;
  height: 24px;
  width: 24px;
`;

const CloseWrapper = styled.div`
  margin-left: auto;
`;

const CheckBoxWrapper = styled.div`
  margin-top: 20px;
`;

const ControlContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 62px;
`;

const ButtonReplace = styled.button`
  background: ${th('colorPrimary')};
  border: 1px solid ${th('colorPrimary')};
  color: white;
  cursor: pointer;
  height: 42px;
  margin-right: 20px;
  width: 100px;
`;

const ButtonReplaceAll = styled.button`
  background: white;
  border: 1px solid ${th('colorPrimary')};
  color: ${th('colorPrimary')};
  cursor: pointer;
  height: 42px;
  margin-right: 10px;
  width: 100px;
`;

const PreviousNextContainer = styled.div`
  margin: 3px 0 0 auto;

  svg {
    box-sizing: unset !important;
    padding: ${grid(2)};

    &:hover {
      background: #f1f5ff;
    }
  }

  svg:first-child {
    margin-right: 20px;
  }
`;

const IconWrapper = styled.span`
  &:focus {
    outline: none;
  }
`;

const ExpandedFindAndReplaceComponent = ({
  close,
  findNextMatch,
  findPreviousMatch,
  matchCaseOption,
  nonExpandedText,
  setMatchCaseValue,
}) => {
  const { t, i18n } = useTranslation();
  const { app } = useContext(ApplicationContext);
  const { pmViews, activeViewId } = useContext(WaxContext);
  const searchRef = useRef(null);
  const replaceRef = useRef(null);
  const [searchValue, setSearchValue] = useState(nonExpandedText);
  const [matchCaseSearch, setMatchCaseSearch] = useState(matchCaseOption);
  const [match, setMatch] = useState([]);
  const [replaceValue, setReplaceValue] = useState('');
  const of =
    !isEmpty(i18n) && i18n.exists('Wax.FindAndReplace.of')
      ? t('Wax.FindAndReplace.of')
      : 'of';
  const [counterText, setCounterText] = useState(`0 ${of} 0`);
  const findAndReplacePlugin = app.PmPlugins.get('findAndReplacePlugin');

  const allStates = [];

  each(pmViews, singleView => {
    allStates.push(singleView.state);
  });

  const debouncedSearchTerm = useDebounce(searchValue, 300);

  // const delayedSearch = useCallback(
  //   debounce(() => searchDocument(), 300),
  //   [searchValue, matchCaseSearch],
  // );

  const onChangeSearchInput = () => {
    setSearchValue(searchRef.current.value);
  };

  useEffect(() => {
    searchDocument();
    let counter = 0;
    counter = helpers.getMatchesByView(pmViews, searchValue, matchCaseSearch);
    setCounterSearches(counter);
  }, [debouncedSearchTerm, matchCaseSearch, JSON.stringify(allStates)]);

  const setCounterSearches = counter => {
    if (counter === 0) return setCounterText(`0 ${of} 0`);
    setCounterText(`0 ${of} ${counter}`);

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
      const matchFound = results.main.filter(result => {
        return from === result.from && to === result.to;
      });

      setMatch(matchFound);
      if (matchFound.length === 1) {
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
          const matchFound = results[notesIds[i]].filter(result => {
            return from === result.from && to === result.to;
          });
          setMatch(matchFound);

          if (matchFound.length === 1) {
            counterMatch += resultsFrom[notesIds[i]].indexOf(from) + 1;
            setCounterText(`${counterMatch} of ${counter}`);
          }
          break;
        }
      }
    }
  };

  const searchDocument = () => {
    findAndReplacePlugin.props.setSearchText(searchValue);
    findAndReplacePlugin.props.setSearchMatchCase(matchCaseSearch);
    // let counter = 0;
    // counter = helpers.getMatchesByView(view, searchValue, matchCaseSearch);
    // setCounterSearches(counter);

    if (searchRef.current === document.activeElement) {
      eachRight(pmViews, singleView => {
        singleView.dispatch(singleView.state.tr);
      });
    }
  };

  const onChangeReplaceInput = () => {
    setReplaceValue(replaceRef.current.value);
  };

  const replace = e => {
    e.preventDefault();
    if (match.length === 1) {
      const { from, to } = match[0];
      pmViews[activeViewId].dispatch(
        pmViews[activeViewId].state.tr.insertText(replaceValue, from, to),
      );
      findNextMatch(searchValue, matchCaseOption);
    }
  };

  const replaceAll = e => {
    e.preventDefault();
    each(pmViews, singleView => {
      const results = DocumentHelpers.findMatches(
        singleView.state.doc,
        searchValue,
        matchCaseOption,
      );
      const {
        state: { tr },
      } = singleView;

      eachRight(results, result => {
        tr.insertText(replaceValue, result.from, result.to);
      });
      singleView.dispatch(tr);
    });
  };

  const closeFind = () => {
    findAndReplacePlugin.props.setSearchText('');
    each(pmViews, singleView => {
      singleView.dispatch(singleView.state.tr);
    });
    close();
  };

  const matchCase = () => {
    setMatchCaseSearch(!matchCaseOption);
    setMatchCaseValue(!matchCaseOption);
    searchRef.current.focus();
  };

  const Translation = ({ label }) => {
    return (
      <>
        {!isEmpty(i18n) && i18n.exists(`Wax.FindAndReplace.${label}`)
          ? t(`Wax.FindAndReplace.${label}`)
          : label}
      </>
    );
  };

  return (
    <Wrapper>
      <TitleContainer>
        <FindTitle>
          {' '}
          <Translation label="Find" />
          & <Translation label="Replace" />{' '}
        </FindTitle>
        <CloseWrapper onClick={closeFind}>
          <StyledIcon name="close" />
        </CloseWrapper>
      </TitleContainer>

      <InputLabel>
        <Translation label="Find" />
      </InputLabel>

      <InputWrapper>
        <FindReplaceInput
          id="search-input"
          onChange={onChangeSearchInput}
          placeholder={
            !isEmpty(i18n) &&
            i18n.exists('Wax.FindAndReplace.Something is this doc')
              ? t('Wax.FindAndReplace.Something is this doc')
              : 'Something is this doc'
          }
          ref={searchRef}
          type="text"
          value={searchValue}
        />
        <CounterInput> {counterText} </CounterInput>
      </InputWrapper>

      <InputLabel>
        <Translation label="Replace with" />
      </InputLabel>
      <InputWrapper>
        <FindReplaceInput
          onChange={onChangeReplaceInput}
          placeholder={
            !isEmpty(i18n) && i18n.exists('Wax.FindAndReplace.Replace text')
              ? t('Wax.FindAndReplace.Replace text')
              : 'Replace text'
          }
          ref={replaceRef}
          type="text"
        />
      </InputWrapper>

      <CheckBoxWrapper>
        <CheckBox
          checked={matchCaseOption}
          label={
            !isEmpty(i18n) && i18n.exists('Wax.FindAndReplace.Case Sensitive')
              ? t('Wax.FindAndReplace.Case Sensitive')
              : 'Case Sensitive'
          }
          name="case-sensitive"
          onChange={matchCase}
        />
      </CheckBoxWrapper>
      <ControlContainer>
        <ButtonReplace onClick={e => replace(e)}>
          {' '}
          <Translation label="Replace" />
        </ButtonReplace>
        <ButtonReplaceAll onClick={e => replaceAll(e)}>
          {' '}
          <Translation label="Replace" /> <Translation label="All" />
        </ButtonReplaceAll>
        <PreviousNextContainer>
          <IconWrapper
            onClick={() => findPreviousMatch(searchValue, matchCaseOption)}
            role="button"
            tabIndex="0"
          >
            <StyledIcon name="navigatePrevious" />
          </IconWrapper>
          <IconWrapper
            onClick={() => findNextMatch(searchValue, matchCaseOption)}
            role="button"
            tabIndex="0"
          >
            <StyledIcon name="navigateNext" />
          </IconWrapper>
        </PreviousNextContainer>
      </ControlContainer>
    </Wrapper>
  );
};

export default ExpandedFindAndReplaceComponent;

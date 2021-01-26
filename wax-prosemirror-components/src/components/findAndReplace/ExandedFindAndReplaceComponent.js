/* eslint react/prop-types: 0 */
import React, {
  useState,
  useRef,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import { each, eachRight, debounce } from 'lodash';
import { WaxContext } from 'wax-prosemirror-core';
import styled from 'styled-components';
import { grid, th } from '@pubsweet/ui-toolkit';
import Icon from '../../helpers/Icon';
import CheckBox from '../../ui/inputs/CheckBox';
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

const SearchInputWrapper = styled.div`
  input {
    padding: ${grid(1)} ${grid(10)} ${grid(1)} ${grid(1)};
    width: 89%;
  }
`;

const CounterInput = styled.span`
  font-size: 12px;
  position: absolute;
  right: 14px;
  -webkit-text-fill-color: rgba(27, 43, 75, 0.28);
  top: 72px;
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

const FindReplaceInput = styled.input`
  border: none;
  box-shadow: inset 0 0 0 1px rgba(27, 43, 75, 0.28);
  font-size: 15px;
  font-weight: 400;
  padding: ${grid(1)};
  width: 98%;

  ::placeholder {
    color: #d8dae0;
  }

  &:focus {
    outline: none;
  }
`;

const CheckBoxWrapper = styled.div`
  margin-top: 20px;
`;

const ControlContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 70px;
`;

const ButtonReplace = styled.button`
  background: ${th('colorBackgroundButton')};
  border: 1px solid ${th('colorBackgroundButton')};
  color: white;
  cursor: pointer;
  height: 42px;
  margin-right: 20px;
  width: 100px;
`;

const ButtonReplaceAll = styled.button`
  background: white;
  border: 1px solid ${th('colorBackgroundButton')};
  color: ${th('colorBackgroundButton')};
  cursor: pointer;
  height: 42px;
  margin-right: 10px;
  width: 100px;
`;

const PreviousNextContainer = styled.div`
  margin: 3px 0 0 auto;

  svg {
    padding: ${grid(2)};

    &:hover {
      background: #f1f5ff;
    }
  }

  svg:first-child {
    margin-right: 20px;
  }
`;

const PreviousNextButton = styled.span`
  &:focus {
    outline: none;
  }
`;

const ExandedFindAndReplaceComponent = ({
  close,
  matchCaseOption,
  nonExpandedText,
}) => {
  const { app, view } = useContext(WaxContext);
  const searchRef = useRef(null);
  const replaceRef = useRef(null);
  const [searchValue, setSearchValue] = useState(nonExpandedText);
  const [replaceValue, setReplaceValue] = useState('');
  const [counterText, setCounterText] = useState('0 of 0');
  const findAndReplacePlugin = app.PmPlugins.get('findAndReplacePlugin');

  const allStates = [];

  each(view, (singleView, viewId) => {
    allStates.push(singleView.state);
  });

  const delayedSearch = useCallback(
    debounce(() => searchDocument(), 300),
    [searchValue],
  );

  const onChangeSearchInput = () => {
    setSearchValue(searchRef.current.value);
  };

  useEffect(() => {
    delayedSearch();
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

  const onChangeReplaceInput = () => {
    setReplaceValue(replaceRef.current.value);
  };

  const replace = () => {
    // const { from, to } = results[0];
    // dispatch(state.tr.insertText(replace, from, to));
  };
  const replaceAll = () => {
    each(view, (singleView, viewId) => {
      const results = helpers.findMatches(singleView.state.doc, searchValue);
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
    each(view, (singleView, viewId) => {
      singleView.dispatch(singleView.state.tr);
    });
    close();
  };

  const findNext = () => {
    // console.log('next');
  };

  const findPrevious = () => {
    // console.log('previous');
  };

  return (
    <Wrapper>
      <TitleContainer>
        <FindTitle> Find & Replace </FindTitle>
        <CloseWrapper onClick={closeFind}>
          <StyledIcon name="close" />
        </CloseWrapper>
      </TitleContainer>
      <InputLabel>Find</InputLabel>

      <SearchInputWrapper>
        <FindReplaceInput
          onChange={onChangeSearchInput}
          placeholder="Something is this doc"
          ref={searchRef}
          type="text"
          value={searchValue}
        />
        <CounterInput> {counterText} </CounterInput>
      </SearchInputWrapper>
      <InputLabel>Replace with</InputLabel>
      <FindReplaceInput
        onChange={onChangeReplaceInput}
        placeholder="Replace text"
        ref={replaceRef}
        type="text"
      />
      <CheckBoxWrapper>
        <CheckBox
          checked={matchCaseOption}
          label="Case Sensitive"
          name="case-sensitive"
        />
      </CheckBoxWrapper>
      <ControlContainer>
        <ButtonReplace onClick={replace}>Replace</ButtonReplace>
        <ButtonReplaceAll onClick={replaceAll}>Replace All</ButtonReplaceAll>
        <PreviousNextContainer>
          <PreviousNextButton onClick={findPrevious} role="button" tabIndex="0">
            <StyledIcon name="navigatePrevious" />
          </PreviousNextButton>
          <PreviousNextButton onClick={findNext} role="button" tabIndex="0">
            <StyledIcon name="navigateNext" />
          </PreviousNextButton>
        </PreviousNextContainer>
      </ControlContainer>
    </Wrapper>
  );
};

export default ExandedFindAndReplaceComponent;

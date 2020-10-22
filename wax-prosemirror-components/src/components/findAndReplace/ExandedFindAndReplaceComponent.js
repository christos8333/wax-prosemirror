/* eslint react/prop-types: 0 */
import React, {
  useState,
  useRef,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import { each, debounce } from 'lodash';
import { WaxContext } from 'wax-prosemirror-core';
import styled from 'styled-components';
import { grid, th } from '@pubsweet/ui-toolkit';
import Icon from '../../helpers/Icon';
import CheckBox from '../../ui/inputs/CheckBox';
import helpers from './helpers';

const Wrapper = styled.div`
  font-size: 15px;
  width: 400px;
  height: 300px;
  background: ${th('colorBackgroundHue')};
  font-family: ${th('fontTools')};
  border-radius: 1.03093% / 8%;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px 0px,
    rgba(9, 30, 66, 0.31) 0px 0px 1px 0px;
  transform: rotate(0deg);
  transform-origin: 50% 50% 0px;
  padding: ${grid(2)};
`;

const FindTitle = styled.span`
  font-size: 16px;
  color: #4b5871;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const InputLabel = styled.div`
  padding: ${grid(2)} ${grid(0)} ${grid(2)} ${grid(0)};
  font-size: 16px;
  color: #4b5871;
`;

const SearchInputWrapper = styled.div`
  input {
    padding: ${grid(1)} ${grid(10)} ${grid(1)} ${grid(1)};
    width: 89%;
  }
`;

const CounterInput = styled.span`
  position: absolute;
  right: 14px;
  top: 72px;
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
  margin-left: auto;
  border-left: 1px solid #e0e2e7;
`;

const FindReplaceInput = styled.input`
  font-size: 15px;
  font-weight: 400;
  border-radius: 2px;
  border: none;
  padding: ${grid(1)};
  width: 98%;
  box-shadow: inset 0 0 0 1px rgba(27, 43, 75, 0.28);
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
  margin-right: 20px;
  border: 1px solid ${th('colorBackgroundButton')};
  color: white;
  width: 100px;
  height: 42px;
  cursor: pointer;
`;

const ButtonReplaceAll = styled.button`
  background: white;
  border: 1px solid ${th('colorBackgroundButton')};
  margin-right: 10px;
  color: ${th('colorBackgroundButton')};
  width: 100px;
  height: 42px;
  cursor: pointer;
`;

const PreviousNextContainer = styled.div`
  margin: 5px 0 0 auto;

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

const ExandedFindAndReplaceComponent = ({ close, nonExpandedText }) => {
  const { app, view } = useContext(WaxContext);
  const searchRef = useRef(null);
  const replaceRef = useRef(null);
  const [searchValue, setSearchValue] = useState(nonExpandedText);
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

  const onChangeReplaceInput = () => {};

  const replace = () => {
    // const { from, to } = results[0];
    // dispatch(state.tr.insertText(replace, from, to));
  };
  const replaceAll = () => {};

  const closeFind = () => {
    findAndReplacePlugin.props.setSearchText('');
    each(view, (singleView, viewId) => {
      singleView.dispatch(singleView.state.tr);
    });
    close();
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
          type="text"
          ref={searchRef}
          placeholder="Something is this doc"
          value={searchValue}
          onChange={onChangeSearchInput}
        />
        <CounterInput> {counterText} </CounterInput>
      </SearchInputWrapper>
      <InputLabel>Replace with</InputLabel>
      <FindReplaceInput
        type="text"
        ref={replaceRef}
        placeholder="Replace text"
        onChange={onChangeReplaceInput}
      />
      <CheckBoxWrapper>
        <CheckBox name="case-sensitive" label="Case Sensitive" />
      </CheckBoxWrapper>
      <ControlContainer>
        <ButtonReplace onClick={replace}>Replace</ButtonReplace>
        <ButtonReplaceAll onClick={replaceAll}>Replace All</ButtonReplaceAll>
        <PreviousNextContainer>
          <StyledIcon name="navigatePrevious" />
          <StyledIcon name="navigateNext" />
        </PreviousNextContainer>
      </ControlContainer>
    </Wrapper>
  );
};

export default ExandedFindAndReplaceComponent;

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
import { grid, th } from '@pubsweet/ui-toolkit';
import { WaxContext } from 'wax-prosemirror-core';
import Icon from '../../helpers/Icon';

import { selectParentNode } from 'prosemirror-commands';

const Wrapper = styled.div`
  width: 400px;
  background: ${th('colorBackgroundHue')};
  border-radius: 1.03093% / 8%;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px 0px,
    rgba(9, 30, 66, 0.31) 0px 0px 1px 0px;
  transform: rotate(0deg);
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

const ExpandedWrapper = styled.div``;

const FindComponent = ({ close, expand, setPreviousSearcValue }) => {
  const {
    app,
    view: { main },
    view,
  } = useContext(WaxContext);

  console.log(view);
  const {
    state: { doc, tr },
  } = main;

  const searchRef = useRef(null);
  const [searchValue, setSearchValue] = useState('');
  const [counterText, setCounterText] = useState('0 of 0');

  const delayedSearch = useCallback(
    debounce(() => searchDocument(), 300),
    [searchValue],
  );

  const findAndReplacePlugin = app.PmPlugins.get('findAndReplacePlugin');

  const onChange = () => {
    setSearchValue(searchRef.current.value);
  };

  useEffect(() => {
    delayedSearch();
  }, [searchValue, delayedSearch]);

  const searchDocument = () => {
    setCounterText('0 of 0');
    const results = [];
    const mergedTextNodes = [];
    let index = 0;

    each(view, (singleView, viewId) => {
      // console.log(singleView, viewId);
    });

    doc.descendants((node, pos) => {
      if (node.isText) {
        if (mergedTextNodes[index]) {
          mergedTextNodes[index] = {
            text: mergedTextNodes[index].text + node.text,
            pos: mergedTextNodes[index].pos,
          };
        } else {
          mergedTextNodes[index] = {
            text: node.text,
            pos,
          };
        }
      } else {
        index += 1;
      }
    });

    mergedTextNodes.forEach(({ text, pos }) => {
      const search = RegExp(searchValue, 'gui');
      let m;
      // eslint-disable-next-line no-cond-assign
      while ((m = search.exec(text))) {
        if (m[0] === '') {
          break;
        }

        results.push({
          from: pos + m.index,
          to: pos + m.index + m[0].length,
        });
      }
    });
    findAndReplacePlugin.props.setResults(results);

    if (results.length > 0) {
      setCounterText(`1 of ${results.length}`);
    }
    tr.setMeta('search', true);
    main.dispatch(tr);
  };

  const closeFind = () => {
    findAndReplacePlugin.props.setResults([]);
    tr.setMeta('search', false);
    main.dispatch(tr);
    close();
  };

  const showExpanded = () => {
    expand();
    setPreviousSearcValue(searchValue);
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
        <StyledIcon name="navigatePrevious" />
        <StyledIcon name="navigateNext" />

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

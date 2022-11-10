/* eslint-disable no-underscore-dangle */
import React, { useContext, useMemo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { find } from 'lodash';
import { ReactDropDownStyles } from 'wax-prosemirror-components';
import { WaxContext, DocumentHelpers } from 'wax-prosemirror-core';
import Dropdown from 'react-dropdown';
import { v4 as uuidv4 } from 'uuid';

const Wrapper = styled.div`
  ${ReactDropDownStyles};
`;
const DropdownStyled = styled(Dropdown)`
  display: inline-flex;
  cursor: not-allowed;
  margin-left: auto;
  opacity: ${props => (props.select ? 1 : 0.4)};
  pointer-events: ${props => (props.select ? 'default' : 'none')};
  .Dropdown-control {
    border: none;
    padding: 8px 30px 8px 10px;

    &:hover {
      box-shadow: none;
    }
  }

  .Dropdown-arrow {
    top: 17px;
  }

  .Dropdown-menu {
    width: 102%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .Dropdown-option {
      width: 100%;
    }
  }
`;

const TestModeDropDownComponent = ({ getPos, node, view }) => {
  const [selectedOption, setSelectedOption] = useState(undefined);

  const context = useContext(WaxContext);
  const {
    pmViews: { main },
  } = context;

  const onChange = option => {
    setSelectedOption(option);

    const allNodes = getNodes(main);
    allNodes.forEach(singleNode => {
      if (singleNode.node.attrs.id === node.attrs.id) {
        main.dispatch(
          main.state.tr
            .setMeta('addToHistory', false)
            .setNodeMarkup(singleNode.pos, undefined, {
              ...singleNode.node.attrs,
              answer: option.value,
            }),
        );
      }
    });
  };

  useEffect(() => {
    const value = selectedOption ? selectedOption.value : '';
    const found = find(node.attrs.options, { value });

    if (!found) {
      setSelectedOption(undefined);
    }
  }, [node.attrs.options]);

  const ReadOnlyMultipleDropDown = useMemo(
    () => (
      <Wrapper key={uuidv4()}>
        <DropdownStyled
          key={uuidv4()}
          onChange={option => onChange(option)}
          options={node.attrs.options}
          placeholder="Select option"
          select
          value={
            selectedOption === 'undedfined' ? 'Select Option' : selectedOption
          }
        />
      </Wrapper>
    ),
    [node.attrs.options, selectedOption],
  );

  return ReadOnlyMultipleDropDown;
};

export default TestModeDropDownComponent;

const getNodes = view => {
  return DocumentHelpers.findInlineNodes(view.state.doc);
};
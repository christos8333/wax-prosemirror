/* eslint-disable no-underscore-dangle */
import React, { useContext, useMemo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { find } from 'lodash';
import { ReactDropDownStyles } from 'wax-prosemirror-components';
import { WaxContext } from 'wax-prosemirror-core';
import { DocumentHelpers } from 'wax-prosemirror-utilities';
import Dropdown from 'react-dropdown';
import { v4 as uuidv4 } from 'uuid';

const Wrapper = styled.div`
  ${ReactDropDownStyles};
`;
const DropdownStyled = styled(Dropdown)`
  cursor: not-allowed;
  display: inline-flex;
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
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    width: 102%;

    .Dropdown-option {
      width: 100%;
    }
  }
`;

const DropComponent = ({ getPos, node, view }) => {
  const [selectedOption, setSelectedOption] = useState(node.attrs.correct);

  const context = useContext(WaxContext);
  const {
    pmViews: { main },
  } = context;

  const onChange = option => {
    const allNodes = getNodes(main);
    allNodes.forEach(singleNode => {
      if (singleNode.node.attrs.id === node.attrs.id) {
        main.dispatch(
          main.state.tr
            .setMeta('addToHistory', false)
            .setNodeMarkup(singleNode.pos, undefined, {
              ...singleNode.node.attrs,
              correct: option.value,
            }),
        );
      }
    });
  };

  // useEffect(() => {
  //   const found = find(node.attrs.options, { value: node.attrs.correct });

  //   if (found) {
  //     setSelectedOption(found);
  //   }
  // }, [node.attrs.options]);

  const MultipleDropDown = useMemo(
    () => (
      <Wrapper key={uuidv4()}>
        <DropdownStyled
          key={uuidv4()}
          onChange={option => onChange(option)}
          options={node.attrs.options}
          placeholder="Select option"
          select
          value={
            selectedOption === 'undefined' ? 'Select Option' : selectedOption
          }
        />
      </Wrapper>
    ),
    [node.attrs.options, selectedOption],
  );

  return MultipleDropDown;
};

export default DropComponent;

const getNodes = view => {
  return DocumentHelpers.findInlineNodes(view.state.doc);
};

/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { ReactDropDownStyles } from 'wax-prosemirror-components';
import { WaxContext, DocumentHelpers } from 'wax-prosemirror-core';
import Dropdown from 'react-dropdown';
import { v4 as uuidv4 } from 'uuid';

const Wrapper = styled.div`
  display: inline-flex;
  ${ReactDropDownStyles};
`;
const DropdownStyled = styled(Dropdown)`
  display: inline-flex;
  cursor: not-allowed;
  margin-left: auto;
  opacity: ${props => (props.select ? 1 : 0.4)};
  pointer-events: ${props => (props.select ? 'default' : 'none')};
  .Dropdown-control {
    // border: none;
    padding: 8px 30px 8px 10px;

    &:hover {
      box-shadow: none;
    }
  }

  .Dropdown-arrow {
    top: 17px;
  }

  .Dropdown-menu {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .Dropdown-option {
      width: 100%;
    }
  }
`;

const DropComponent = ({ getPos, node, options }) => {
  const [selectedOption, setSelectedOption] = useState(undefined);

  const context = useContext(WaxContext);
  const {
    pmViews: { main },
  } = context;

  const customProps = main.props.customValues;
  const { testMode } = customProps;

  useEffect(() => {
    const currentOption = node.attrs.options.filter(option => {
      return option.value === node.attrs.correct;
    });
    if (!testMode && currentOption[0]) setSelectedOption(currentOption[0]);
  }, []);

  const onChange = option => {
    const allNodes = getNodes(main);
    const { tr } = main.state;
    allNodes.forEach(singleNode => {
      if (singleNode.node.attrs.id === node.attrs.id) {
        tr.setNodeMarkup(singleNode.pos, undefined, {
          ...singleNode.node.attrs,
          answer: option.value,
        });
      }
    });
    main.dispatch(tr);
  };

  const MultipleDropDown = useMemo(
    () => (
      <Wrapper key={uuidv4()}>
        <DropdownStyled
          disabled={!testMode}
          key={uuidv4()}
          onChange={option => onChange(option)}
          options={options}
          placeholder="Select option"
          select
          value={
            selectedOption === 'undedfined' ? 'Select Option' : selectedOption
          }
        />
      </Wrapper>
    ),
    [selectedOption],
  );

  return MultipleDropDown;
};

export default DropComponent;

const getNodes = view => {
  return DocumentHelpers.findInlineNodes(view.state.doc);
};

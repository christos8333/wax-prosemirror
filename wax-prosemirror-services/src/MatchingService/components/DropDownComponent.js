/* eslint-disable no-underscore-dangle */
import React, { useMemo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { find } from 'lodash';
import { ReactDropDownStyles } from 'wax-prosemirror-components';
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

const DropComponent = ({ getPos, node, view }) => {
  const [selectedOption, setSelectedOption] = useState(undefined);

  const onChange = option => {
    setSelectedOption(option);
  };

  useEffect(() => {
    const value = selectedOption ? selectedOption.value : '';
    const found = find(node.attrs.options, { value });

    if (!found) setSelectedOption(undefined);
  }, [node.attrs.options]);

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
            selectedOption === 'undedfined' ? 'Select Option' : selectedOption
          }
        />
      </Wrapper>
    ),
    [node.attrs.options, selectedOption],
  );

  return MultipleDropDown;
};

export default DropComponent;

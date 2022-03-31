/* eslint-disable no-underscore-dangle */
import React, { useContext, useMemo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { WaxContext } from 'wax-prosemirror-core';
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

const DropComponent = ({ options }) => {
  console.log(options);
  const context = useContext(WaxContext);
  const {
    pmViews: { main },
  } = context;

  const dropDownOptions = [
    {
      label: 'Option 1',
      value: '0',
    },
    {
      label: 'Long Option 2',
      value: '1',
    },
    {
      label: 'Option 3',
      value: '2',
    },
    {
      label: 'Option 4',
      value: '3',
    },
  ];

  useEffect(() => {}, []);

  const onChange = option => {};

  const MultipleDropDown = useMemo(
    () => (
      <Wrapper key={uuidv4()}>
        <DropdownStyled
          key={uuidv4()}
          onChange={option => onChange(option)}
          options={options}
          placeholder="Select option"
          select
          value="Select option"
        />
      </Wrapper>
    ),
    [],
  );

  return MultipleDropDown;
};

export default DropComponent;

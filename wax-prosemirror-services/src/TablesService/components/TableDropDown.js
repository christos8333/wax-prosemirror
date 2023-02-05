/* eslint react/prop-types: 0 */
import React, { useMemo, useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import * as tablesFn from 'prosemirror-tables';
import { WaxContext, ReactDropDownStyles } from 'wax-prosemirror-core';
import Dropdown from 'react-dropdown';
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';

const Wrapper = styled.span`
  // ${ReactDropDownStyles};
  div[role='menu'] {
    visibility: hidden;
  }

  div[role='menu'].visible {
    visibility: visible;
  }
`;

const DropdownStyled = styled(Dropdown)`
  display: inline-flex;
  opacity: ${props => (props.select ? 1 : 0.4)};
  pointer-events: ${props => (props.select ? 'default' : 'none')};

  .Dropdown-control {
    border: none;
    padding-top: 12px;

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
    width: 120%;

    .Dropdown-option {
      width: 100%;
    }
  }
`;

const TableDropDown = ({ item }) => {
  const dropDownOptions = [
    { label: 'Add column before', value: 'addColumnBefore' },
    { label: 'Add column after', value: 'addColumnAfter' },
    { label: 'Delete column', value: 'deleteColumn' },
    { label: 'Insert row before', value: 'addRowBefore' },
    { label: 'Insert row after', value: 'addRowAfter' },
    { label: 'Delete row', value: 'deleteRow' },
    { label: 'Delete table', value: 'deleteTable' },
    { label: 'Merge cells', value: 'mergeCells' },
    { label: 'Split cell', value: 'splitCell' },
    { label: 'Toggle header column', value: 'toggleHeaderColumn' },
    { label: 'Toggle header row', value: 'toggleHeaderRow' },
    { label: 'Toggle header cells', value: 'toggleHeaderCell' },
  ];

  const { buttonProps, itemProps, isOpen = true } = useDropdownMenu(2);

  const { activeView } = useContext(WaxContext);
  const [selectedOption, setSelectedOption] = useState('');
  const appliedDropDownOptions = [];

  dropDownOptions.forEach(option => {
    if (tablesFn[option.value](activeView.state)) {
      appliedDropDownOptions.push(option);
    }
  });
  const isDisabled = item.select(activeView.state);

  useEffect(() => {}, [selectedOption]);

  return (
    <Wrapper>
      <div className={isOpen ? 'visible' : ''} role="menu">
        <a {...dropDownOptions[0]} href="https://example.com">
          Regular link
        </a>
        <a {...dropDownOptions[1]}>With click handler</a>
      </div>
    </Wrapper>
  );

  const TableDropDownComponent = useMemo(
    () => (
      <Wrapper>
        <DropdownStyled
          onChange={option => {
            item.run(
              activeView.state,
              activeView.dispatch,
              tablesFn[option.value],
            );
            setSelectedOption(option.value);

            setTimeout(() => {
              activeView.focus();
            });
          }}
          options={appliedDropDownOptions}
          placeholder="Table Options"
          select={isDisabled}
        />
      </Wrapper>
    ),
    [isDisabled, selectedOption, appliedDropDownOptions],
  );

  return TableDropDownComponent;
};

export default TableDropDown;

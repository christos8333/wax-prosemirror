/* eslint react/prop-types: 0 */
import React, { useMemo, useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import * as tablesFn from 'prosemirror-tables';
import { WaxContext, ReactDropDownStyles } from 'wax-prosemirror-core';
import Dropdown from 'react-dropdown';
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';

const Wrapper = styled.div`
  div {
    z-index: 999;
    position: absolute;
  }
`;

const DropDownButton = styled.button`
  -webkit-appearance: none;
  appearance: none;
  background: #eee;
  border: 1px solid #ddd;
  border-radius: 0.2rem;
  color: #000;
  cursor: pointer;
  display: flex;
  font-size: 1.5rem;
  font-weight: 300;
  line-height: 1;
  margin: auto;
  outline: 0;
  padding: 1rem 0;
  position: relative;
  transition: 0.2s 0.05s;
  width: 10rem;
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

  const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(2);
  console.log(buttonProps, itemProps);
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

  const openCloseMenu = () => {
    setIsOpen(!isOpen);
  };

  console.log(isOpen);
  return (
    <Wrapper>
      <DropDownButton
        {...buttonProps}
        id="menu-button"
        type="button"
        onClick={openCloseMenu}
      >
        Table Options
      </DropDownButton>
      <div role="menu" style={{ visibility: isOpen ? 'visible' : 'hidden' }}>
        {dropDownOptions.map(option => {
          return (
            <span key={option.value} role="menuitem" tabIndex="-1">
              {option.label}
            </span>
          );
        })}
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

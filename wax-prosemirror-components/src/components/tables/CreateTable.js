/* eslint react/prop-types: 0 */

import React, { useState, useContext, useMemo } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import styled from 'styled-components';
import { grid } from '@pubsweet/ui-toolkit';

import MenuButton from '../../ui/buttons/MenuButton';
import InsertTableTool from '../../ui/tables/InsertTableTool';

const Wrapper = styled.div`
  font-size: 0;
  position: relative;
  z-index: 2;
`;

const DropWrapper = styled.div`
  margin-top: ${grid(1)};
  position: absolute;
  background: white;
`;

const CreateTable = ({ view = {}, item }) => {
  const {
    view: { main },
    activeViewId,
  } = useContext(WaxContext);
  if (item.onlyOnMain) {
    view = main;
  }

  const { state } = view;
  const { enable, icon, run, select, title } = item;
  const [isOpen, setIsOpen] = useState(false);

  const dropComponent = (
    <InsertTableTool
      onGridSelect={(colRows, editorState, editorDispatch) =>
        handleSelect(colRows, view.state, view.dispatch)
      }
    />
  );

  const handleSelect = (colRows, editorState, editorDispatch) => {
    run(colRows, editorState, editorDispatch);
    setIsOpen(!isOpen);
  };

  const isDisabled =
    enable && !enable(state) && !(select && select(state, activeViewId));

  const MemorizedDropdown = useMemo(
    () => (
      <Wrapper>
        <MenuButton
          active={isOpen}
          disabled={isDisabled}
          iconName={icon}
          onMouseDown={() => {
            setIsOpen(!isOpen);
          }}
          title={title}
        />

        {isOpen && <DropWrapper>{dropComponent}</DropWrapper>}
      </Wrapper>
    ),
    [isDisabled, isOpen],
  );

  return MemorizedDropdown;

  // const MemorizedDropdown = useMemo(
  //   () => (
  //     <Dropdown
  //       active={showTool}
  //       dropComponent={dropComponent}
  //       iconName={icon}
  //       disabled={isDisabled}
  //       onMouseDown={toggleShowTool}
  //       title={title}
  //     />
  //   ),
  //   [isDisabled, showTool],
  // );
  //
  // return MemorizedDropdown;
};

export default CreateTable;

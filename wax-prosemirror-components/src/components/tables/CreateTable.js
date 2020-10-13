/* eslint react/prop-types: 0 */

import React, { useState, useContext, useMemo, useEffect, useRef } from 'react';
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
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const dropComponent = (
    <InsertTableTool
      onGridSelect={colRows => handleSelect(colRows, view.state, view.dispatch)}
    />
  );

  const handleSelect = (colRows, editorState, editorDispatch) => {
    run(colRows, editorState, editorDispatch);
    setIsOpen(!isOpen);
  };

  const isDisabled =
    enable && !enable(state) && !(select && select(state, activeViewId));

  useOnClickOutside(ref, () => setIsOpen(false));

  const MemorizedDropdown = useMemo(
    () => (
      <Wrapper ref={ref}>
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
};

// Hook
const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = event => {
      /* Do nothing if clicking ref's element or descendent elements */
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
export default CreateTable;

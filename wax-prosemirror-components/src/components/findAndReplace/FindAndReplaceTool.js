import React, { useEffect, useRef, useMemo, useContext, useState } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import styled from 'styled-components';
import { grid } from '@pubsweet/ui-toolkit';

import MenuButton from '../../ui/buttons/MenuButton';

const CreateTable = ({ view = {}, item }) => {
  const {
    view: { main },
    activeViewId,
  } = useContext(WaxContext);
  if (item.onlyOnMain) {
    view = main;
  }

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

  const { state } = view;
  const { enable, icon, run, select, title } = item;
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const dropComponent = <div> find and replace</div>;

  // const isDisabled =
  //   enable && !enable(state) && !(select && select(state, activeViewId));
  //
  // useOnClickOutside(ref, () => setIsOpen(false));

  const MemorizedDropdown = useMemo(
    () => (
      <Wrapper ref={ref}>
        <MenuButton
          active={isOpen}
          // disabled={isDisabled}
          iconName={icon}
          onMouseDown={() => {
            setIsOpen(!isOpen);
          }}
          title={title}
        />

        {isOpen && <DropWrapper>{dropComponent}</DropWrapper>}
      </Wrapper>
    ),
    [isOpen],
  );

  return MemorizedDropdown;
};

export default CreateTable;

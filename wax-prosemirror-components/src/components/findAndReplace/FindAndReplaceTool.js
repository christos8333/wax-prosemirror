import React, {
  useRef,
  useMemo,
  useContext,
  useState,
  useLayoutEffect,
} from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import styled from 'styled-components';
import { grid } from '@pubsweet/ui-toolkit';

import MenuButton from '../../ui/buttons/MenuButton';
import FindAndReplaceComponent from './FindAndReplaceComponent';
import useOnClickOutside from '../../helpers/useOnClickOutside';

const FindAndReplaceTool = ({ view = {}, item }) => {
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
    top: 32px;
  `;

  const { state } = view;
  const { enable, icon, run, select, title } = item;
  const dropElement = useRef();
  const [isOpen, setIsOpen] = useState(false);

  // const isDisabled =
  //   enable && !enable(state) && !(select && select(state, activeViewId));
  //

  let styles = { right: '-205px' };
  const [style, setStyle] = useState(styles);

  useLayoutEffect(() => {
    setStyle(styles);
    if (!dropElement.current) return;
    const { right } = dropElement.current.getBoundingClientRect();
    if (right > window.window.innerWidth) {
      const newRight = -205 + (right - window.window.innerWidth) + 15;
      styles = { right: `${newRight}px` };
      setStyle(styles);
    }
  }, [isOpen]);

  const MemorizedDropdown = useMemo(
    () => (
      <Wrapper>
        <MenuButton
          active={isOpen}
          disabled={false}
          iconName={icon}
          onMouseDown={() => {
            setIsOpen(!isOpen);
          }}
          title={title}
        />

        {isOpen && (
          <DropWrapper style={style} ref={dropElement}>
            <FindAndReplaceComponent />
          </DropWrapper>
        )}
      </Wrapper>
    ),
    [isOpen, styles],
  );

  return MemorizedDropdown;
};

export default FindAndReplaceTool;

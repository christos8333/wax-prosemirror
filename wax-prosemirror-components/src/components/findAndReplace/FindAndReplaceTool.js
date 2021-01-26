import React, {
  useContext,
  useRef,
  useMemo,
  useState,
  useLayoutEffect,
} from 'react';

import styled from 'styled-components';
import { grid } from '@pubsweet/ui-toolkit';
import { WaxContext } from 'wax-prosemirror-core';

import MenuButton from '../../ui/buttons/MenuButton';
import FindAndReplaceComponent from './FindAndReplaceComponent';

const Wrapper = styled.div`
  font-size: 0;
  position: relative;
  z-index: 2;
`;

const DropWrapper = styled.div`
  background: white;
  margin-top: ${grid(1)};
  position: absolute;
  top: 32px;
`;

const FindAndReplaceTool = ({ view = {}, item }) => {
  const {
    view: { main },
  } = useContext(WaxContext);

  const { icon, title } = item;
  const dropElement = useRef();
  const [isOpen, setIsOpen] = useState(false);

  let styles = { right: '-205px' };
  const [style, setStyle] = useState(styles);

  let isDisabled = false;
  const isEditable = main.props.editable(editable => {
    return editable;
  });
  if (!isEditable) isDisabled = true;

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
          disabled={isDisabled}
          iconName={icon}
          onMouseDown={() => {
            setIsOpen(!isOpen);
          }}
          title={title}
        />

        {isOpen && (
          <DropWrapper style={style} ref={dropElement}>
            <FindAndReplaceComponent
              close={() => {
                setIsOpen(false);
              }}
            />
          </DropWrapper>
        )}
      </Wrapper>
    ),
    [isOpen, style],
  );

  return MemorizedDropdown;
};

export default FindAndReplaceTool;

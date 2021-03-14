import React, { useMemo, useState, useRef, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { grid, th } from '@pubsweet/ui-toolkit';
import { v4 as uuidv4 } from 'uuid';
import { WaxContext } from 'wax-prosemirror-core';
import MenuButton from '../../ui/buttons/MenuButton';
import useOnClickOutside from '../../helpers/useOnClickOutside';

const Wrapper = styled.div`
  font-size: 0;
  position: relative;
  z-index: 2;

  button {
    border: ${props =>
      props.active ? `1px solid #535E76` : `1px solid #D8DAE0`};

    &:hover {
      background: ${props => (props.active ? `#535E76` : '#D8DAE0')};
    }
  }

  &:before {
    border-bottom: ${props =>
      props.active ? `8px solid #535E76` : `8px solid #D8DAE0`};

    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    bottom: 26px;
    content: '';
    height: 0;
    left: 48%;
    position: relative;
    width: 0;
  }
`;

const DropWrapper = styled.div`
  background: white;
  margin-top: ${grid(1)};
  position: absolute;
  top: 32px;
  width: max-content;
`;
const CounterInfoComponent = styled.div`
  background: white;
  border: 1px solid ${th('colorPrimary')};
  bottom: 45px;
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 31px;
`;

const EditorShortCutsTool = ({ view: { state }, item }) => {
  const { title } = item;
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef();
  const {
    activeView,
    view: { main },
  } = useContext(WaxContext);

  useOnClickOutside(ref, () => setIsOpen(false));

  const renderList = () => {
    return <span>hii</span>;
  };

  const MenuButtonComponent = useMemo(
    () => (
      <Wrapper active={isOpen} ref={ref}>
        <MenuButton
          active={isOpen}
          disabled={false}
          label="short cuts"
          onMouseDown={() => {
            setIsOpen(!isOpen);
          }}
          title={title}
        />

        {isOpen && (
          <DropWrapper>
            <CounterInfoComponent
              close={() => {
                setIsOpen(false);
              }}
              item={item}
              key={uuidv4()}
              view={state}
            >
              {renderList()}
            </CounterInfoComponent>
          </DropWrapper>
        )}
      </Wrapper>
    ),
    [isOpen],
  );
  return MenuButtonComponent;
};

export default EditorShortCutsTool;

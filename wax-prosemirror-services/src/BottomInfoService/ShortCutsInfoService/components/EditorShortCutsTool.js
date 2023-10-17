import React, { useMemo, useState, useRef } from 'react';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { grid } from '@pubsweet/ui-toolkit';
import { v4 as uuidv4 } from 'uuid';
import { useOnClickOutside, MenuButton } from 'wax-prosemirror-core';

const Wrapper = styled.div`
  font-size: 0;
  position: relative;
  z-index: 2;

  button {
    background: ${props => (props.active ? `#535E76` : '#fff')};
    border: ${props =>
      props.active ? `1px solid #535E76` : `1px solid #D8DAE0`};

    &:hover {
      background: ${props => (props.active ? `#535E76` : '#D8DAE0')};
    }
    box-shadow: 0px -2px 6px 1px rgba(204, 204, 204, 0.41);
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
  background: #fff;
  border-radius: 1.03093% / 8%;
  bottom: 45px;
  box-shadow: rgb(9 30 66 / 25%) 0px 4px 8px 0px,
    rgb(9 30 66 / 31%) 0px 0px 1px 0px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  padding: calc(4px * 2);
  position: fixed;
  right: 136px;
  transform-origin: 50% 50% 0px;
  width: 200px;
`;

const ShortCutsContainer = styled.div`
  font-size: 14px;
  height: 240px;
  padding: 4px;
  width: 200px;
`;

const ShortCutsList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;

  li {
    padding-bottom: 6px;

    span {
      color: #535e76;
    }
  }
`;

const EditorShortCutsTool = ({ view: { state }, item }) => {
  const { t, i18n } = useTranslation();
  const { title } = item;
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef();

  useOnClickOutside(ref, () => setIsOpen(false));

  const renderList = () => {
    return (
      <ShortCutsContainer>
        <ShortCutsList>
          <li>
            <span>Ctrl + s </span> : Save
          </li>
          <li>
            <span>Ctrl + z </span> : Undo
          </li>
          <li>
            <span>Ctrl + Shift + z </span> : Redo
          </li>

          <li>
            <span>Shift+Ctrl+8 </span> : Bullet List
          </li>
          <li>
            <span>Shift+Ctrl+9 </span> : Ordered List
          </li>
          <li>
            <span>Ctrl-] </span> : Indent list item
          </li>
          <li>
            <span>Ctrl-[ </span> : Lift list item
          </li>
          <li>
            <span>Ctrl or Shift + Enter </span> : Soft break
          </li>
          <li>
            <span>Ctrl + f </span> : Search and replace
          </li>
          <li>
            <span>Shift + Enter </span> : Exit code block
          </li>
        </ShortCutsList>
      </ShortCutsContainer>
    );
  };

  const MenuButtonComponent = useMemo(
    () => (
      <Wrapper active={isOpen} ref={ref}>
        <MenuButton
          active={isOpen}
          disabled={false}
          label={
            !isEmpty(i18n) && i18n.exists('Wax.ShortCuts.short cuts')
              ? t('Wax.ShortCuts.short cuts')
              : 'short cuts'
          }
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
    [isOpen, t('Wax.ShortCuts.short cuts')],
  );
  return MenuButtonComponent;
};

export default EditorShortCutsTool;

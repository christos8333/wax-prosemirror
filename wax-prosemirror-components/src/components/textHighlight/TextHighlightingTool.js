import React, { useMemo, useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import { grid } from '@pubsweet/ui-toolkit';
import { v4 as uuidv4 } from 'uuid';
import { WaxContext } from 'wax-prosemirror-core';
import MenuButton from '../../ui/buttons/MenuButton';
import useOnClickOutside from '../../helpers/useOnClickOutside';

const Wrapper = styled.div`
  font-size: 0;
  position: relative;
  z-index: 2;
  button:hover {
    background: transparent;
  }
`;

const DropWrapper = styled.div`
  margin-top: ${grid(1)};
  position: absolute;
  background: white;
  top: 32px;
  width: max-content;
`;
const TextHighlightComponent = styled.div`
  display: flex;
  flex-direction: column;
  background:white
  border:1px solid gray
`;
const Highlighter = styled.div`
  min-width: 25px;
  height: 25px;
  margin: 5px;
  display: inline-grid;
  cursor: pointer;
  border: 1px solid gray;
`;

const TextHighlightingTool = ({ view: { dispatch, state }, item }) => {
  const { icon, title, select } = item;
  const [isOpen, setIsOpen] = useState(false);
  let dblClick = false;
  const ref = useRef();
  const {
    view: { main },
    activeViewId,
    activeView,
  } = useContext(WaxContext);

  useOnClickOutside(ref, () => setIsOpen(false));
  let lastSaveColor;

  const highlightDropDownOptions = [
    { name: 'red', value: 'color:red' },
    { name: 'blue', value: 'color:blue' },
    { name: 'yellow', value: 'color:yellow' },
    { name: 'black', value: 'color:black' },
    { name: 'green', value: 'color:green' },
    { name: 'gray', value: 'color:gray' },
    { name: 'orange', value: 'color:orange' },
    { name: 'brown', value: 'color:brown' },
    { name: 'aquamarine', value: 'color:aquamarine' },
    { name: 'transparent', value: 'color:transparent' },
  ];

  const renderList = () => {
    const lists = [];

    Object.keys(highlightDropDownOptions).forEach(key => {
      lists.push(
        <Highlighter
          onMouseDown={e => handleMouseDown(e)}
          key={uuidv4()}
          title={highlightDropDownOptions[key].name}
          data-style={highlightDropDownOptions[key].value}
          style={{ backgroundColor: highlightDropDownOptions[key].name }}
        />,
      );
    });
    return <div>{lists}</div>;
  };

  const handleMouseDown = e => {
    e.preventDefault();
    item.run(
      activeView.state,
      activeView.dispatch,
      e.target.getAttribute('style'),
    );

    lastSaveColor = e.target.getAttribute('style');
    localStorage.setItem('lastColor', lastSaveColor);
    const btnBackground = e.target.title;
    localStorage.setItem('lastBgColor', btnBackground);
    setIsOpen(false);
  };
  const handleDblClk = () => {
    item.run(state, dispatch, localStorage.getItem('lastColor'));
  };

  const isDisabled = !select(state, activeViewId, activeView);

  const MenuButtonComponent = useMemo(
    () => (
      <Wrapper ref={ref} onDoubleClick={handleDblClk}>
        <div
          style={{
            backgroundColor:
              localStorage.getItem('lastBgColor') != undefined
                ? localStorage.getItem('lastBgColor')
                : highlightDropDownOptions[0].name,
          }}
        >
          <MenuButton
            active={isOpen}
            disabled={isDisabled}
            iconName={icon}
            onMouseDown={() => {
              setIsOpen(!isOpen);
            }}
            title={title}
          />
        </div>
        {isOpen && (
          <DropWrapper>
            <TextHighlightComponent
              key={uuidv4()}
              item={item}
              view={(dispatch, state)}
              close={() => {
                setIsOpen(false);
              }}
            >
              {renderList()}
            </TextHighlightComponent>
          </DropWrapper>
        )}
      </Wrapper>
    ),
    [isOpen, isDisabled],
  );

  return MenuButtonComponent;
};

export default TextHighlightingTool;

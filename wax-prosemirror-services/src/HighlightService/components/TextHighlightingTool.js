import React, { useMemo, useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import { grid, override } from '@pubsweet/ui-toolkit';
import { v4 as uuidv4 } from 'uuid';
import {
  WaxContext,
  useOnClickOutside,
  MenuButton,
} from 'wax-prosemirror-core';

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
  width: max-content;

  ${override('Wax.HighlightToolWrapper')}
`;
const TextHighlightComponent = styled.div`
  background: white;
  border: 1px solid gray;
  display: flex;
  flex-direction: column;
`;
const Highlighter = styled.div`
  border: 1px solid gray;
  cursor: pointer;
  display: inline-grid;
  height: 25px;
  margin: 5px;
  min-width: 25px;
`;

const TextHighlightingTool = ({ view: { dispatch, state }, item }) => {
  const { icon, title, select } = item;
  const [isOpen, setIsOpen] = useState(false);

  const highlightDropDownOptions = [
    { name: 'yellow', value: '#F3E95C' },
    { name: 'blue', value: '#7DE5DB' },
    { name: 'green', value: '#C0EB96' },
    { name: 'pink', value: '#F2C4D1' },
    { name: 'orange', value: '#FFB56B' },
    { name: 'red', value: '#FF8080' },
    { name: 'remove highlight', value: 'transparent' },
  ];

  const ref = useRef();
  const {
    activeViewId,
    activeView,
    pmViews: { main },
  } = useContext(WaxContext);

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  useOnClickOutside(ref, () => setIsOpen(false));

  const renderList = () => {
    const lists = [];

    Object.keys(highlightDropDownOptions).forEach(key => {
      lists.push(
        <Highlighter
          data-style={highlightDropDownOptions[key].value}
          key={uuidv4()}
          onMouseDown={e =>
            handleMouseDown(e, highlightDropDownOptions[key].value)
          }
          style={{ backgroundColor: highlightDropDownOptions[key].value }}
          title={highlightDropDownOptions[key].name}
        />,
      );
    });
    return <div>{lists}</div>;
  };

  const handleMouseDown = (e, color) => {
    e.preventDefault();
    item.run(activeView.state, activeView.dispatch, color);
    if (color !== 'transparent') localStorage.setItem('lastBgColor', color);
    setIsOpen(false);
  };

  const handleDblClk = () => {
    const color = localStorage.getItem('lastBgColor')
      ? localStorage.getItem('lastBgColor')
      : highlightDropDownOptions[0].value;

    item.run(state, dispatch, color);
  };

  let isDisabled = !select(state, activeViewId, activeView);
  if (!isEditable) isDisabled = true;

  const line = document.getElementById('trait');
  if (line)
    line.style.fill =
      localStorage.getItem('lastBgColor') !== null
        ? localStorage.getItem('lastBgColor')
        : highlightDropDownOptions[0].name;

  const MenuButtonComponent = useMemo(
    () => (
      <Wrapper onDoubleClick={handleDblClk} ref={ref}>
        <div disabled={isDisabled}>
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
              close={() => {
                setIsOpen(false);
              }}
              item={item}
              key={uuidv4()}
              view={(dispatch, state)}
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

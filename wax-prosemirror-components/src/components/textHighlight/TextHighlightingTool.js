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

  button,
  button:hover {
    background: transparent;
  }
`;

const DropWrapper = styled.div`
  background: white;
  margin-top: ${grid(1)};
  position: absolute;
  top: 32px;
  width: max-content;
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
    { name: 'red', value: 'red' },
    { name: 'Light blue', value: '#add8e6' },
    { name: 'yellow', value: 'yellow' },
    { name: 'green', value: '#90EE90' },
    { name: 'gray', value: '#d3d3d3' },
    { name: 'orange', value: 'orange' },
    { name: 'brown', value: 'brown' },
    { name: 'aquamarine', value: 'aquamarine' },
    { name: 'remove highlight', value: 'transparent' },
  ];

  const ref = useRef();
  const { activeViewId, activeView, view } = useContext(WaxContext);
  const isEditable = view.main.props.editable(editable => {
    return editable;
  });

  useOnClickOutside(ref, () => setIsOpen(false));

  const renderList = () => {
    const lists = [];

    Object.keys(highlightDropDownOptions).forEach(key => {
      lists.push(
        <Highlighter
          onMouseDown={e =>
            handleMouseDown(e, highlightDropDownOptions[key].value)
          }
          key={uuidv4()}
          title={highlightDropDownOptions[key].name}
          data-style={highlightDropDownOptions[key].value}
          style={{ backgroundColor: highlightDropDownOptions[key].value }}
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

  const MenuButtonComponent = useMemo(
    () => (
      <Wrapper ref={ref} onDoubleClick={handleDblClk}>
        <div
          disabled={isDisabled}
          style={{
            backgroundColor:
              localStorage.getItem('lastBgColor') != undefined
                ? localStorage.getItem('lastBgColor')
                : highlightDropDownOptions[0].name,
            opacity: isDisabled ? '0.6' : '1',
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

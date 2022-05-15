/* eslint-disable react/prop-types */
import React, {
  useContext,
  useState,
  useRef,
  useLayoutEffect,
  useMemo,
  useEffect,
} from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

const TriangleTop = styled.div`
  width: 0;
  height: 0;
  margin: 0px auto;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 10px solid #535e76;
`;

const DropDownComponent = styled.div`
  width: 174px;
  height: 150px;
  background: white;
  border: 1px solid #535e76;
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

const Options = styled.div``;

const AddOption = styled.div`
  display: flex;
  margin-top: auto;
  input {
    border: none;
    border-bottom: 1px solid black;
    width: 100px;
    &:focus {
      outline: none;
    }

    ::placeholder {
      color: rgb(170, 170, 170);
      font-style: italic;
    }
  }
  button {
    border: 1px solid #535e76;
    cursor: pointer;
    color: #535e76;
    margin-left: 20px;
    background: #fff;
    padding: 4px 8px 4px 8px;
    &:hover {
      border: 1px solid #535e76;
      cursor: pointer;
      color: #535e76;
      margin-right: 10px;
      background: #fff;
      background: #535e76;
      color: #fff;
      padding: 4px 8px 4px 8px;
    }
  }
`;

export default ({ setPosition, position }) => {
  const context = useContext(WaxContext);
  const {
    activeView,
    pmViews: { main },
  } = context;

  const customProps = main.props.customValues;

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const currentOptions = activeView.state.selection.node
    ? activeView.state.selection.node.attrs.options
    : [];

  const readOnly = !isEditable;

  const [options, setOptions] = useState(currentOptions);

  const [optionText, setOptionText] = useState('');
  const addOptionRef = useRef(null);

  useLayoutEffect(() => {
    const { selection } = activeView.state;
    const { from } = selection;
    const WaxSurface = activeView.dom.getBoundingClientRect();
    const start = activeView.coordsAtPos(from);
    const left = start.left - WaxSurface.left - 75;
    const top = start.top - WaxSurface.top + 30;
    setPosition({ ...position, left, top });
  }, [position.left]);

  useEffect(() => {
    if (addOptionRef.current) addOptionRef.current.focus();
  }, []);

  const updateOptionText = () => {
    setOptionText(addOptionRef.current.value);
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter' || event.which === 13) {
      addOption();
    }
  };

  const addOption = () => {
    console.log('text', addOptionRef.current.value);
    if (addOptionRef.current.value.trim() === '') return;
    const obj = { label: addOptionRef.current.value, value: uuidv4() };
    setOptions(prevOptions => [...prevOptions, obj]);
    setOptionText('');
    addOptionRef.current.focus();
  };

  console.log(options);

  return (
    <>
      <TriangleTop />
      <DropDownComponent>
        <Options>All Options</Options>
        <AddOption>
          <input
            onChange={updateOptionText}
            onKeyPress={handleKeyDown}
            placeholder="Type an option ..."
            ref={addOptionRef}
            type="text"
            value={optionText}
          />
          <button onMouseUp={addOption} type="button">
            Add
          </button>
        </AddOption>
      </DropDownComponent>
    </>
  );
};

/* eslint-disable react/prop-types */
import React, {
  useContext,
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
} from 'react';
import { WaxContext, Icon } from 'wax-prosemirror-core';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { NodeSelection } from 'prosemirror-state';
import RadioButton from './RadioButton';

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

const Options = styled.div`
  display: flex;
  flex-direction: column;
  height: 100px;
  font-size: 11px;
  overflow-y: auto;
`;

const Option = styled.div`
  display: flex;
  flex-direction: row;
  width: 96%;
`;

const AddOption = styled.div`
  display: flex;
  margin-top: auto;
  input {
    border: none;
    border-bottom: 1px solid black;
    width: 160px;
    &:focus {
      outline: none;
    }

    ::placeholder {
      color: rgb(170, 170, 170);
      font-style: italic;
      font-size: 10px;
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

const IconRemove = styled(Icon)`
  cursor: pointer;
  position: relative;
  top: 2px;
  left: 6px;
  height: 16px;
  width: 16px;
`;

let previousNode = '';

export default ({ setPosition, position }) => {
  console.log('here');
  const context = useContext(WaxContext);
  const {
    activeView,
    pmViews: { main },
  } = context;

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const currentNode = position.node;
  const currentOptions = currentNode.node.attrs.options;

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
    const top = start.top - WaxSurface.top + 25;
    setPosition({ ...position, left, top });
  }, [position.left]);

  useEffect(() => {
    // if (addOptionRef.current) addOptionRef.current.focus();
    if (!activeView.state.selection.node) return;
    const { tr } = activeView.state;

    if (previousNode.from !== currentNode.from) {
      tr.setNodeMarkup(position.from, undefined, {
        ...currentNode.node.attrs,
        options: currentNode.node.attrs.options,
      });
      setOptions(currentNode.node.attrs.options);
    } else {
      tr.setNodeMarkup(position.from, undefined, {
        ...currentNode.node.attrs,
        options,
      });
    }
    previousNode = currentNode;

    const resolvedPos = tr.doc.resolve(position.from);
    tr.setSelection(new NodeSelection(resolvedPos));
    activeView.dispatch(tr.setMeta('reject', true));
  }, [options, position.from]);

  const updateOptionText = () => {
    setOptionText(addOptionRef.current.value);
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter' || event.which === 13) {
      addOption();
    }
  };

  const addOption = () => {
    if (addOptionRef.current.value.trim() === '') return;
    const obj = { label: addOptionRef.current.value, value: uuidv4() };
    setOptions(prevOptions => [...prevOptions, obj]);
    setOptionText('');
    // addOptionRef.current.focus();
  };

  const removeOption = id => {
    setOptions(options.filter(option => option.value !== id));
    setOptionText('');
  };

  if (!readOnly) {
    return (
      <>
        <TriangleTop />
        <DropDownComponent>
          <Options>
            {options.map(value => {
              return (
                <Option key={uuidv4()}>
                  <RadioButton item={value} node={currentNode} />
                  <span
                    aria-hidden="true"
                    onClick={() => removeOption(value.value)}
                    role="button"
                    style={{ marginLeft: 'auto' }}
                  >
                    <IconRemove name="deleteOutlined" />
                  </span>
                </Option>
              );
            })}
          </Options>
          <AddOption>
            <input
              onChange={updateOptionText}
              onKeyPress={handleKeyDown}
              placeholder="Type an option and press enter..."
              ref={addOptionRef}
              type="text"
              value={optionText}
            />
            {/* <button onMouseUp={addOption} type="button">
            Add
          </button> */}
          </AddOption>
        </DropDownComponent>
      </>
    );
  }
  return null;
};

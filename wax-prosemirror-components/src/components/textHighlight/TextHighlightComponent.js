import React, { useMemo, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { grid } from '@pubsweet/ui-toolkit';
import useOnClickOutside from '../../helpers/useOnClickOutside';


const Wrapper = styled.div`
  width: 400px;
  height: 250px;
  overflow: hidden;
  background: #fff;
`;

const HighlightListComponent = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const Highlighter = styled.div`
  min-width: 25px;
  height: 25px;
  display: inline-grid;
  cursor: pointer;
  border-radius: 50%;
  &:hover {
    background: white;
  }
  span {
    font-size: 16px;
    text-align: center;
    padding-top: 3px;
    color: white;
  }
`;

const TextHighlightComponent = ({ view = { dispatch, state }, item, close }) => {

  const highlightDropDownOptions = [
    { name: 'red', value: 'background-color:red' },
    { name: 'blue', value: 'background-color:blue' },
    { name: 'yellow', value: 'background-color:yellow' },
    { name: 'black', value: 'background-color:black' },
    { name: 'transparent', value: 'background-color:transparent' },
  ];

  const handleMouseDown = e => {
    e.preventDefault();
    console.log("state@@@@ ", view.state, "        ########dispatch  ", view.dispatch);
    item.run(view.state, view.dispatch);
  };

  const renderList = () => {
    const lists = [];

    Object.keys(highlightDropDownOptions).forEach(function (key) {
      lists.push(
        <Highlighter onMouseDown={e => handleMouseDown(e)} key={uuidv4()}
          title={highlightDropDownOptions[key].name} iconName={item.icon} 
        >
        </Highlighter>
      );
    });
    return <div>{lists}</div>;
  };


  return (
    <Wrapper>
      <HighlightListComponent>{renderList()}</HighlightListComponent>
    </Wrapper>
  );
};

export default TextHighlightComponent;



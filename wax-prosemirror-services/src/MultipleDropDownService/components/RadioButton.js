/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import { NodeSelection } from 'prosemirror-state';
import styled from 'styled-components';

const CheckContainer = styled.label`
  display: block;
  position: relative;
  padding-left: 20px;
  margin-bottom: 5px;
  cursor: pointer;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  &:hover input ~ span {
    background-color: #ccc;
  }

  input:checked ~ span {
    background-color: #535e76;
  }

  input:checked ~ .span:after {
    display: block;
  }

  span:after {
    top: 9px;
    left: 9px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: white;
  }
`;

const RadioBtn = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 15px;
  width: 15px;
  background-color: #eee;
  border-radius: 50%;

  &:after {
    content: '';
    position: absolute;
    display: none;
  }
`;

export default ({ item, node }) => {
  const context = useContext(WaxContext);
  const { activeView } = context;
  const [correctOption, setCorrectOption] = useState(node.node.attrs.correct);

  const onChange = () => {
    const { tr } = activeView.state;
    tr.setNodeMarkup(node.from, undefined, {
      ...node.node.attrs,
      correct: item.value,
    });
    const resolvedPos = tr.doc.resolve(node.from);
    tr.setSelection(new NodeSelection(resolvedPos));
    activeView.dispatch(tr.setMeta('reject', true));
  };

  useEffect(() => {
    setCorrectOption(item.value);
  }, [correctOption]);

  return (
    <CheckContainer>
      {item.label}
      <input
        checked={correctOption === item.value}
        name="radio"
        onChange={onChange}
        type="radio"
      />
      <RadioBtn />
    </CheckContainer>
  );
};

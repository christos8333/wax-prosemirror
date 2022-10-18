/* eslint-disable react/prop-types */
import React, { useContext, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { WaxContext } from 'wax-prosemirror-core';

export default ({ setPosition, position }) => {
  const context = useContext(WaxContext);
  const {
    activeView,
    pmViews: { main },
  } = context;

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const readOnly = !isEditable;

  const StyledInputAlt = styled.input`
    background: #e2ebff;
    border: none;
    box-sizing: border-box;
    width: 240px;
    min-height: 20px;
    padding: 4px;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: black;
      font-weight: bold;
    }
  `;

  useLayoutEffect(() => {
    const WaxSurface = activeView.dom.getBoundingClientRect();
    const { selection } = activeView.state;

    if (!selection || !selection.node || !selection.node.attrs.id) return;
    const imageId = selection.node.attrs.id;
    const image = document.querySelector(`[data-id='${imageId}']`);
    const imagePosition = image.getBoundingClientRect();
    const left = imagePosition.left - WaxSurface.left;
    const top = imagePosition.bottom - WaxSurface.top - 22;
    setPosition({ ...position, left, top });
    console.log(position);
  }, [position.left]);

  if (!readOnly) {
    return <StyledInputAlt placeholder="Alt Text" type="text" />;
  }
};

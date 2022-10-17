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

  useLayoutEffect(() => {
    const WaxSurface = activeView.dom.getBoundingClientRect();
    const { selection } = activeView.state;
    const imageId = selection.node.attrs.id;
    const image = document.querySelector(`[data-id='${imageId}']`);
    const imagePosition = image.getBoundingClientRect();
    const left = imagePosition.left - WaxSurface.left;
    const top = imagePosition.bottom - WaxSurface.top + 10;
    setPosition({ ...position, left, top });
  }, [position.left]);

  if (!readOnly) {
    return <input type="text" />;
  }
};

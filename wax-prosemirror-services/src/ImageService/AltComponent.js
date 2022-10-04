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
    console.log(activeView.state.selection);
    const left = 300;
    const top = 500;
    setPosition({ ...position, left, top });
  }, [position.left]);

  if (!readOnly) {
    return <input type="text" />;
  }
};

import React, { useMemo, useState, useContext } from 'react';
import styled from 'styled-components';
import { WaxContext } from 'wax-prosemirror-core';

const ToggleAiComponent = ({ item }) => {
  const { icon, title } = item;
  const [isOpen, setIsOpen] = useState(false);

  const {
    pmViews: { main },
  } = useContext(WaxContext);

  let isDisabled = false;
  const isEditable = main.props.editable(editable => {
    return editable;
  });

  if (!isEditable) isDisabled = true;

  return useMemo(() => <span> Toggle Ai</span>, [isOpen, isDisabled]);
};

export default ToggleAiComponent;

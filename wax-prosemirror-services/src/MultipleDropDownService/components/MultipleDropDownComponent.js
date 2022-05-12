/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import { Icon } from 'wax-prosemirror-components';
import styled from 'styled-components';

const StyledIconAction = styled(Icon)`
  height: 24px;
  width: 24px;
  outline: 1px solid black;
`;

export default ({ node, view, getPos }) => {
  const context = useContext(WaxContext);
  const {
    pmViews: { main },
    pmViews,
    activeViewId,
  } = context;

  const [isActive, setIsActive] = useState(false);
  const customProps = main.props.customValues;
  const posFrom = pmViews[activeViewId].state.selection.from;

  const isEditable = main.props.editable(editable => {
    return editable;
  });
  const readOnly = !isEditable;

  useEffect(() => {
    setIsActive(false);
    if (getPos() + 2 === posFrom) {
      setIsActive(true);
    }
  }, [posFrom]);

  return (
    <>
      <StyledIconAction isActive={isActive} name="mulitpleDropDown" />
    </>
  );
};

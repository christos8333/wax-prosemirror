/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import { Icon } from 'wax-prosemirror-components';
import styled, { css } from 'styled-components';

const activeStylesContainer = css`
  background: #535e76;
  border-radius: 2px;
`;

const activeStylesSvg = css`
  fill: white !important;
`;

const StyledIconActionContainer = styled.div`
  display: inline-block;
  padding: 2px;
  ${props => props.isActive && activeStylesContainer}
`;

const StyledIconAction = styled(Icon)`
  height: 24px;
  width: 24px;
  cursor: pointer;

  ${props => props.isActive && activeStylesSvg}
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
    if (getPos() === posFrom) {
      setIsActive(true);
    }
  }, [posFrom]);

  return (
    <StyledIconActionContainer isActive={isActive}>
      <StyledIconAction isActive={isActive} name="mulitpleDropDown" />
    </StyledIconActionContainer>
  );
};

/* eslint react/prop-types: 0 */
import React, { useContext, useMemo } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import styled, { css } from 'styled-components';
import { MenuButton } from 'wax-prosemirror-components';

const activeStyles = css`
  pointer-events: none;
`;

const StyledButton = styled(MenuButton)`
  ${props => props.active && activeStyles}
`;

const ToolBarBtn = ({ view = {}, item }) => {
  const { active, icon, label, onlyOnMain, run, select, title } = item;
  const context = useContext(WaxContext);
  const {
    view: { main },
    activeViewId,
    activeView,
  } = useContext(WaxContext);

  if (onlyOnMain) view = main;

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const { state } = view;

  const isActive = !!(
    active(state, activeViewId) && select(state, activeViewId)
  );

  let isDisabled = !select(state, activeViewId, activeView);
  if (!isEditable) isDisabled = true;

  const ToolBarBtnComponent = useMemo(
    () => (
      <StyledButton
        active={isActive || false}
        disabled={isDisabled}
        iconName={icon}
        label={label}
        onMouseDown={e => {
          e.preventDefault();
          item.run(view, main, context);
        }}
        title={title}
      />
    ),
    [isActive, isDisabled],
  );

  return ToolBarBtnComponent;
};

export default ToolBarBtn;

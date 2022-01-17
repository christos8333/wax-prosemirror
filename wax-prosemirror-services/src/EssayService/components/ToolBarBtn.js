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
  const { icon, label, select, title } = item;
  const context = useContext(WaxContext);
  const {
    view: { main },
    activeView,
  } = useContext(WaxContext);

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const { state } = view;

  let isDisabled = !select(state, activeView);
  if (!isEditable) isDisabled = true;

  const ToolBarBtnComponent = useMemo(
    () => (
      <StyledButton
        active={false}
        disabled={isDisabled}
        iconName={icon}
        label={label}
        onMouseDown={e => {
          e.preventDefault();
          item.run(context.view.main, context);
        }}
        title={title}
      />
    ),
    [isDisabled],
  );

  return ToolBarBtnComponent;
};

export default ToolBarBtn;

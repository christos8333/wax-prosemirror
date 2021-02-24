/* eslint react/prop-types: 0 */
import React, { useContext, useMemo } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import styled, { css } from 'styled-components';
import MenuButton from '../../ui/buttons/MenuButton';

const activeStyles = css`
  pointer-events: none;
`;

const StyledButton = styled(MenuButton)`
  ${props => props.active && activeStyles}
`;

const LeftSideButton = ({ view = {}, item }) => {
  const { active, icon, label, onlyOnMain, run, select, title } = item;

  const {
    view: { main },
    activeViewId,
    activeView,
  } = useContext(WaxContext);

  if (onlyOnMain) view = main;

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const { dispatch, state } = view;

  const handleMouseDown = (e, editorState, editorDispatch) => {
    e.preventDefault();
    run(editorState, dispatch);
  };

  const isActive = !!(
    active(state, activeViewId) && select(state, activeViewId)
  );

  let isDisabled = !select(state, activeViewId, activeView);
  if (!isEditable) isDisabled = true;

  const LeftSideButtonComponent = useMemo(
    () => (
      <StyledButton
        active={isActive || false}
        disabled={isDisabled}
        iconName={icon}
        label={label}
        onMouseDown={e => handleMouseDown(e, view.state, view.dispatch)}
        title={title}
      />
    ),
    [isActive, isDisabled],
  );

  return LeftSideButtonComponent;
};

export default LeftSideButton;

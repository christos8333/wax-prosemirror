/* eslint react/prop-types: 0 */
import React, { useContext, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { WaxContext } from '../WaxContext';
import { MenuButton } from 'wax-prosemirror-components';

const activeStyles = css`
  pointer-events: none;
`;

const StyledButton = styled(MenuButton)`
  ${props => props.active && activeStyles}
`;

const LeftSideButton = ({ view = {}, item }) => {
  const { active, icon, label, run, select, title } = item;

  const {
    pmViews: { main },
    activeViewId,
    activeView,
  } = useContext(WaxContext);

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const { dispatch, state } = view;

  const handleMouseDown = (e, editorState) => {
    e.preventDefault();
    run(editorState, dispatch);
  };

  // const isActive = !!(
  //   active(state, activeViewId) && select(state, activeViewId)
  // );

  const isActive = !!active(state, activeViewId);

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

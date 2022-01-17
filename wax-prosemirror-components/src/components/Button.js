/* eslint react/prop-types: 0 */
import React, { useContext, useMemo } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import MenuButton from '../ui/buttons/MenuButton';

const Button = ({ view = {}, item }) => {
  const { active, icon, label, run, select, title } = item;
  const context = useContext(WaxContext);
  const {
    view: { main },
    activeViewId,
    activeView,
  } = context;

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const { state } = view;

  const handleMouseDown = (e, editorState, editorDispatch) => {
    e.preventDefault();
    run(editorState, editorDispatch);
  };

  const isActive = !!(
    active(activeView.state, activeViewId) &&
    select(state, activeViewId, activeView)
  );

  let isDisabled = !select(state, activeViewId, activeView);
  if (!isEditable) isDisabled = true;

  const MenuButtonComponent = useMemo(
    () => (
      <MenuButton
        active={isActive || false}
        disabled={isDisabled}
        iconName={icon}
        label={label}
        onMouseDown={e =>
          handleMouseDown(e, activeView.state, activeView.dispatch)
        }
        title={title}
      />
    ),
    [isActive, isDisabled, activeViewId],
  );

  return MenuButtonComponent;
};

export default Button;

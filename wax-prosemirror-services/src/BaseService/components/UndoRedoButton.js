/* eslint react/prop-types: 0 */
import React, { useContext, useMemo } from 'react';
import { WaxContext, MenuButton } from 'wax-prosemirror-core';

const UndoRedoButton = ({ view = {}, item }) => {
  const { active, icon, label, run, select, title } = item;

  const {
    pmViews: { main },
    activeViewId,
    activeView,
  } = useContext(WaxContext);

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

  const UndoRedoButtonComponent = useMemo(
    () => (
      <MenuButton
        active={isActive || false}
        disabled={isDisabled}
        iconName={icon}
        label={label}
        onMouseDown={e => handleMouseDown(e, main.state, main.dispatch)}
        title={title}
      />
    ),
    [isActive, isDisabled],
  );

  return UndoRedoButtonComponent;
};

export default UndoRedoButton;

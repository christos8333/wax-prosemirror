/* eslint react/prop-types: 0 */
import React, { useContext, useMemo, useEffect } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import { DocumentHelpers } from 'wax-prosemirror-utilities';
import MenuButton from '../ui/buttons/MenuButton';

const SaveButton = ({ view = {}, item }) => {
  const { active, icon, label, onlyOnMain, run, select, title } = item;

  const {
    app,
    view: { main },
    activeViewId,
    activeView,
  } = useContext(WaxContext);

  if (onlyOnMain) view = main;

  const { state } = view;

  const handleMouseDown = (e, editorState, editorDispatch) => {
    console.log('save');
  };

  const isActive = !!active(state, activeViewId);
  let isDisabled = !select(state, activeViewId, activeView);

  const isEditable = main.props.editable(editable => {
    return editable;
  });
  if (!isEditable) isDisabled = true;

  const SaveButtonComponent = useMemo(
    () => (
      <MenuButton
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

  return SaveButtonComponent;
};

export default SaveButton;

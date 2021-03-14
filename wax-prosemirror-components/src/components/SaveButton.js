/* eslint react/prop-types: 0 */
import React, { useContext, useMemo, useEffect, useState } from 'react';
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

  const [isSaving, setIsSaving] = useState(false);

  const handleMouseDown = (e, editorState, editorDispatch) => {
    // eslint-disable-next-line no-underscore-dangle
    // view._props.onChange(state.doc.content);
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 300);
  };

  let isDisabled = !select(state, activeViewId, activeView);

  const isEditable = main.props.editable(editable => {
    return editable;
  });
  if (!isEditable) isDisabled = true;

  const iconTodisplay = !isSaving ? icon : 'done';

  const SaveButtonComponent = useMemo(
    () => (
      <MenuButton
        active={false}
        disabled={isDisabled}
        iconName={iconTodisplay}
        label={label}
        onMouseDown={e => handleMouseDown(e, view.state, view.dispatch)}
        title={title}
      />
    ),
    [isSaving, isDisabled],
  );

  return SaveButtonComponent;
};

export default SaveButton;

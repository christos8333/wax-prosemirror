/* eslint react/prop-types: 0 */
import React, { useContext, useMemo, useEffect, useState } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import MenuButton from '../ui/buttons/MenuButton';

const SaveButton = ({ view = {}, item }) => {
  const { icon, label, select, title } = item;

  const {
    view: { main },
    activeViewId,
    activeView,
  } = useContext(WaxContext);

  const { state } = view;

  const [isSaving, setIsSaving] = useState(false);

  const handleMouseDown = () => {
    // view.props.onChange(state.doc.content);
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 300);
  };

  const triggerSave = e => {
    if ((e.key === 83 || e.keyCode === 83) && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleMouseDown();
      return false;
    }
    return true;
  };

  useEffect(() => {
    document.addEventListener('keydown', triggerSave);

    return () => document.removeEventListener('keydown', triggerSave);
  }, []);

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
        onMouseDown={handleMouseDown}
        title={title}
      />
    ),
    [isSaving, isDisabled],
  );

  return SaveButtonComponent;
};

export default SaveButton;

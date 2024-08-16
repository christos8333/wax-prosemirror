/* eslint react/prop-types: 0 */
import React, { useContext, useMemo, useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import {
  ApplicationContext,
  WaxContext,
  MenuButton,
} from 'wax-prosemirror-core';
import helpers from './helpers';

const SaveButton = ({ view = {}, item }) => {
  const { app } = useContext(ApplicationContext);
  const { t, i18n } = useTranslation();
  const { icon, label, select, title } = item;

  const {
    pmViews: { main },
    activeViewId,
    activeView,
  } = useContext(WaxContext);

  const { state } = view;

  const [isSaving, setIsSaving] = useState(false);

  const handleMouseDown = () => {
    const saveConfig = app.config.get('config.SaveService');
    if (saveConfig) {
      helpers.saveContent(
        state.doc.content,
        saveConfig.saveSource,
        state.config.schema,
        main.props.serializer,
        main.props.targetFormat,
      );
    }
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
        title={
          !isEmpty(i18n) && i18n.exists(`Wax.Base.${title}`)
            ? t(`Wax.Base.${title}`)
            : title
        }
      />
    ),
    [isSaving, isDisabled, t(`Wax.Base.${title}`)],
  );

  return SaveButtonComponent;
};

export default SaveButton;

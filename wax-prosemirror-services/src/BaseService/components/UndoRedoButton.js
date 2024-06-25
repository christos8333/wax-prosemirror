/* eslint react/prop-types: 0 */
import React, { useContext, useMemo } from 'react';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { WaxContext, MenuButton } from 'wax-prosemirror-core';

const UndoRedoButton = ({ item }) => {
  const { t, i18n } = useTranslation();
  const { active, icon, label, run, select, title } = item;
  const context = useContext(WaxContext);
  const {
    pmViews: { main },
    activeViewId,
    activeView,
  } = context;

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const handleMouseDown = e => {
    e.preventDefault();
    run(context.options.currentState, activeView.dispatch);
  };

  const isActive = !!(
    active(context.options.currentState, activeViewId) &&
    select(context.options.currentState, activeViewId, activeView)
  );

  let isDisabled = !select(
    context.options.currentState,
    activeViewId,
    activeView,
  );
  if (!isEditable) isDisabled = true;

  const UndoRedoButtonComponent = useMemo(
    () => (
      <MenuButton
        active={isActive || false}
        disabled={isDisabled}
        iconName={icon}
        label={label}
        onMouseDown={e => handleMouseDown(e)}
        title={
          !isEmpty(i18n) && i18n.exists(`Wax.Base.${title}`)
            ? t(`Wax.Base.${title}`)
            : title
        }
      />
    ),
    [isActive, isDisabled, t(`Wax.Base.${title}`)],
  );

  return UndoRedoButtonComponent;
};

export default UndoRedoButton;

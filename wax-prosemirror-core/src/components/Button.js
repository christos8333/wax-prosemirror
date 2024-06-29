/* eslint react/prop-types: 0 */
import React, { useContext, useMemo } from 'react';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { WaxContext } from '../WaxContext';
import MenuButton from './ui/MenuButton';

const Button = ({ view = {}, item }) => {
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

  // const { state } = view;

  const handleMouseDown = e => {
    e.preventDefault();
    console.log(activeView.state, context)
    run(activeView.state, activeView.dispatch, activeView, context);
  };

  const isActive = !!(
    active(activeView.state, activeViewId) &&
    select(activeView.state, activeViewId, activeView)
  );

  let isDisabled = !select(
    context.activeView.state,
    context.activeViewId,
    context.activeView,
  );
  if (!isEditable) isDisabled = true;
  const MenuButtonComponent = useMemo(
    () => (
      <MenuButton
        active={isActive || false}
        disabled={isDisabled}
        iconName={icon}
        label={label}
        onMouseDown={e => handleMouseDown(e)}
        title={
          !isEmpty(i18n) && i18n.exists(`Wax.Annotations.${title}`)
            ? t(`Wax.Annotations.${title}`)
            : title
        }
      />
    ),
    [isActive, isDisabled, activeViewId, t(`Wax.Annotations.${title}`)],
  );

  return MenuButtonComponent;
};

export default Button;

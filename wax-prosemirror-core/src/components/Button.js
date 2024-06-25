/* eslint react/prop-types: 0 */
import React, { useContext, useMemo } from 'react';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { WaxContext } from '../WaxContext';
import { StateContext } from '../StateContext';
import MenuButton from './ui/MenuButton';

const Button = ({ item }) => {
  const { t, i18n } = useTranslation();
  const { active, icon, label, run, select, title } = item;
  const context = useContext(WaxContext);
  const {
    pmViews: { main },
    activeViewId,
    activeView,
  } = context;

  const { state } = useContext(StateContext);

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const isActive = !!(
    active(state, activeViewId) && select(state, activeViewId, activeView)
  );

  let isDisabled = !select(state, context.activeViewId, context.activeView);
  if (!isEditable) isDisabled = true;

  const onMouseDown = e => {
    e.preventDefault();
    run(state, activeView.dispatch, activeView, context);
  };

  const MenuButtonComponent = useMemo(() => {
    return (
      <MenuButton
        active={isActive || false}
        disabled={isDisabled}
        iconName={icon}
        label={label}
        onMouseDown={onMouseDown}
        title={
          !isEmpty(i18n) && i18n.exists(`Wax.Annotations.${title}`)
            ? t(`Wax.Annotations.${title}`)
            : title
        }
      />
    );
  }, [isActive, isDisabled, activeViewId, t(`Wax.Annotations.${title}`)]);

  return MenuButtonComponent;
};

export default Button;

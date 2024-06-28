/* eslint react/prop-types: 0 */

import React, { useContext, useMemo } from 'react';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { TextSelection } from 'prosemirror-state';
import { WaxContext, MenuButton } from 'wax-prosemirror-core';

const FullScreenButton = ({ view = {}, item }) => {
  const { t, i18n } = useTranslation();
  const { active, icon, label, select, title } = item;
  const context = useContext(WaxContext);

  const { activeViewId, activeView, options } = context;
  const { state } = view;

  const handleMouseDown = e => {
    e.preventDefault();
    Object.assign(options, { fullScreen: !options.fullScreen });
    activeView.dispatch(
      activeView.state.tr.setSelection(
        TextSelection.between(
          activeView.state.selection.$anchor,
          activeView.state.selection.$head,
        ),
      ),
    );
    activeView.focus();
  };

  const usedIcon = options.fullScreen ? 'fullScreenExit' : icon;
  const titleToshow = options.fullScreen ? 'Exit full screen' : title;
  const isActive = active(state, activeViewId) && select(state, activeViewId);
  const isDisabled = !select(state, activeViewId, activeView);

  const MenuButtonComponent = useMemo(
    () => (
      <MenuButton
        active={false}
        disabled={false}
        iconName={usedIcon}
        label={label}
        onMouseDown={e => handleMouseDown(e)}
        title={
          !isEmpty(i18n) && i18n.exists(`Wax.Various.${titleToshow}`)
            ? t(`Wax.Various.${titleToshow}`)
            : titleToshow
        }
      />
    ),
    [isActive, isDisabled, usedIcon, t(`Wax.Various.${title}`)],
  );

  return MenuButtonComponent;
};

export default FullScreenButton;

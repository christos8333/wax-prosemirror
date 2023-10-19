/* eslint react/prop-types: 0 */

import React, { useContext, useMemo } from 'react';
import { TextSelection } from 'prosemirror-state';
import { WaxContext, MenuButton } from 'wax-prosemirror-core';

const FullScreenButton = ({ view = {}, item }) => {
  const { active, icon, select } = item;
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
  const isActive = active(state, activeViewId) && select(state, activeViewId);

  const isDisabled = !select(state, activeViewId, activeView);

  const MenuButtonComponent = useMemo(
    () => (
      <MenuButton
        active={false}
        disabled={false}
        iconName={usedIcon}
        onMouseDown={e => handleMouseDown(e)}
      />
    ),
    [isActive, isDisabled, usedIcon],
  );

  return MenuButtonComponent;
};

export default FullScreenButton;

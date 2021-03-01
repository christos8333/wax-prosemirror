/* eslint react/prop-types: 0 */

import React, { useContext, useMemo } from 'react';
import { TextSelection } from 'prosemirror-state';
import { WaxContext } from 'wax-prosemirror-core';
import MenuButton from '../../ui/buttons/MenuButton';

const Button = ({ view = {}, item }) => {
  const { active, icon, label, select, title } = item;
  const context = useContext(WaxContext);

  const { activeViewId, activeView, options } = context;

  const { state } = view;

  const handleMouseDown = (e, editorState, editorDispatch) => {
    e.preventDefault();
    options.fullScreen = !options.fullScreen;
    const { selection } = editorState;
    activeView.dispatch(
      activeView.state.tr.setSelection(
        new TextSelection(activeView.state.tr.doc.resolve(selection.from)),
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
        label={label}
        onMouseDown={e => handleMouseDown(e, view.state, view.dispatch)}
        title={title}
      />
    ),
    [isActive, isDisabled, usedIcon],
  );

  return MenuButtonComponent;
};

export default Button;

/* eslint react/prop-types: 0 */
import React, { useContext, useMemo } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import MenuButton from '../ui/buttons/MenuButton';

const TitleButton = ({ view = {}, item }) => {
  const { active, icon, label, onlyOnMain, run, select, title } = item;

  const {
    view: { main },
    activeViewId,
    activeView,
  } = useContext(WaxContext);

  if (onlyOnMain) view = main;

  const { dispatch, state } = view;

  const handleMouseDown = (e, editorState, editorDispatch) => {
    e.preventDefault();
    run(editorState, dispatch);
  };

  const isActive = !!active(state, activeViewId);
  const isDisabled = !select(state, activeViewId, activeView);

  const TitleButtonComponent = useMemo(
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

  return TitleButtonComponent;
};

export default TitleButton;

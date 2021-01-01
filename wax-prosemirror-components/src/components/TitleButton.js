/* eslint react/prop-types: 0 */
import React, { useContext, useMemo, useEffect } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import { DocumentHelpers } from 'wax-prosemirror-utilities';
import MenuButton from '../ui/buttons/MenuButton';

const TitleButton = ({ view = {}, item }) => {
  const { active, icon, label, onlyOnMain, run, select, title } = item;

  const {
    app,
    view: { main },
    activeViewId,
    activeView,
  } = useContext(WaxContext);

  if (onlyOnMain) view = main;

  const { dispatch, state } = view;

  const titleNode = DocumentHelpers.findChildrenByType(
    state.doc,
    state.config.schema.nodes.title,
    true,
  );

  const handleMouseDown = (e, editorState, editorDispatch) => {
    e.preventDefault();
    run(editorState, dispatch);
  };

  const serviceConfig = app.config.get('config.TitleService');

  useEffect(() => {
    if (titleNode[0]) {
      serviceConfig.updateTitle(titleNode[0].node.textContent);
    } else {
      serviceConfig.updateTitle('');
    }
  }, [JSON.stringify(titleNode[0])]);

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

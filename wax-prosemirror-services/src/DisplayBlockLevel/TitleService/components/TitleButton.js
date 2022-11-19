/* eslint react/prop-types: 0 */
import React, { useContext, useMemo, useEffect } from 'react';
import { WaxContext, DocumentHelpers } from 'wax-prosemirror-core';
import { MenuButton } from 'wax-prosemirror-components';

const TitleButton = ({ view = {}, item }) => {
  const { active, icon, label, run, select, title } = item;

  const {
    app,
    pmViews: { main },
    activeViewId,
    activeView,
  } = useContext(WaxContext);

  const { dispatch, state } = view;

  const titleNode = DocumentHelpers.findChildrenByType(
    state.doc,
    state.config.schema.nodes.title,
    true,
  );

  const handleMouseDown = (e, editorState) => {
    e.preventDefault();
    run(editorState, dispatch);
  };

  const serviceConfig = app.config.get('config.TitleService');

  let chapterTitle = '';
  if (titleNode[0]) chapterTitle = titleNode[0].node.textContent;

  useEffect(() => {
    if (titleNode[0]) {
      if (serviceConfig)
        serviceConfig.updateTitle(titleNode[0].node.textContent);
    } else {
      if (serviceConfig) serviceConfig.updateTitle('');
    }
  }, [chapterTitle]);

  const isActive = !!active(state, activeViewId);
  let isDisabled = !select(state, activeViewId, activeView);

  const isEditable = main.props.editable(editable => {
    return editable;
  });
  if (!isEditable) isDisabled = true;

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

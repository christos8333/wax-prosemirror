/* eslint react/prop-types: 0 */
import React, { useContext, useMemo, useEffect } from 'react';
import { WaxContext, DocumentHelpers, MenuButton } from 'wax-prosemirror-core';
import { TextSelection } from 'prosemirror-state';

const ExternalApiButton = ({ view = {}, item, ExternalAPIContent }) => {
  const { active, icon, label, run, select, title } = item;

  const {
    app,
    pmViews: { main },
    activeViewId,
    activeView,
  } = useContext(WaxContext);

  const { state } = view;

  const handleMouseDown = (e, editorState) => {
    e.preventDefault();
    const {
      selection: { $from, $to },
    } = editorState;
    const textSelection = new TextSelection($from, $to);

    const content = textSelection.content();

    ExternalAPIContent(content.content.content[0].textContent);
  };

  useEffect(() => {}, []);

  const isActive = !!active(state, activeViewId);
  let isDisabled = !select(state, activeViewId, activeView);

  const isEditable = main.props.editable(editable => {
    return editable;
  });
  if (!isEditable) isDisabled = true;

  const ExternalApiButtonComponent = useMemo(
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

  return ExternalApiButtonComponent;
};

export default ExternalApiButton;

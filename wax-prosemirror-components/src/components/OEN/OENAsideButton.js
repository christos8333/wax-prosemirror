/* eslint react/prop-types: 0 */
import React, { useContext, useMemo } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import { wrapIn } from 'prosemirror-commands';
import { liftTarget } from 'prosemirror-transform';
import MenuButton from '../../ui/buttons/MenuButton';

const OENAsideButton = ({ view = {}, item, type }) => {
  const { active, icon, label, run, select, title } = item;

  const {
    app,
    pmViews: { main },
    activeViewId,
    activeView,
  } = useContext(WaxContext);

  const { dispatch, state } = view;

  const handleMouseDown = (e, editorState, editorDispatch) => {
    e.preventDefault();

    const { from, to } = main.state.selection;
    let isInOenContainer = false;

    main.state.doc.nodesBetween(from, to, (node, pos) => {
      if (node.type.name === 'oen_aside') {
        isInOenContainer = true;
      }
    });

    if (isInOenContainer) {
      const range = main.state.selection.$from.blockRange(
        main.state.selection.$to,
      );
      const target = range && liftTarget(range);
      if (target == null) return false;
      main.dispatch(main.state.tr.lift(range, target));
    }

    wrapIn(main.state.config.schema.nodes.oen_aside, {
      class: type,
    })(main.state, main.dispatch);

    setTimeout(() => {
      main.focus();
    });
  };

  const isActive = !!active(state, activeViewId);
  let isDisabled = !select(state, activeViewId, activeView);

  const isEditable = main.props.editable(editable => {
    return editable;
  });
  if (!isEditable) isDisabled = true;

  const OENAsideButtonComponent = useMemo(
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

  return OENAsideButtonComponent;
};

export default OENAsideButton;

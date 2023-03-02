/* eslint react/prop-types: 0 */
import React, { useContext, useMemo } from 'react';
import { WaxContext, MenuButton } from 'wax-prosemirror-core';
import { wrapIn } from 'prosemirror-commands';
import { liftTarget } from 'prosemirror-transform';
import { v4 as uuidv4 } from 'uuid';

const OENAsideButton = ({ view = {}, item, type }) => {
  const { active, icon, label, select, title } = item;

  const {
    pmViews: { main },
    activeViewId,
    activeView,
  } = useContext(WaxContext);

  const { state } = view;

  const handleMouseDown = e => {
    e.preventDefault();

    const { from, to } = main.state.selection;
    let isInOenContainer = false;

    main.state.doc.nodesBetween(from, to, node => {
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
      id: uuidv4(),
    })(main.state, main.dispatch);

    setTimeout(() => {
      main.focus();
    });
    return true;
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
        onMouseDown={e => handleMouseDown(e)}
        title={title}
      />
    ),
    [isActive, isDisabled],
  );

  return OENAsideButtonComponent;
};

export default OENAsideButton;

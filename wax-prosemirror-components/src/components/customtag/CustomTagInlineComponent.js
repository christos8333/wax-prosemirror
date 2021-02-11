import React, { useMemo, useState, useContext } from 'react';
import { WaxContext } from 'wax-prosemirror-core';

import MenuButton from '../../ui/buttons/MenuButton';

const CustomTagInlineComponent = ({ view: { state }, item }) => {
  const { icon, title } = item;
  const localInline = JSON.parse(localStorage.getItem('isInline'));
  const [isOpen, setIsOpen] = useState(
    !!(localInline !== null && localInline !== false),
  );

  const {
    view: { main },
  } = useContext(WaxContext);

  let isDisabled = false;
  const isEditable = main.props.editable(editable => {
    return editable;
  });
  if (!isEditable) isDisabled = true;

  const onClickIcon = () => {
    setIsOpen(isOpen !== true);
    localStorage.setItem('isInline', isOpen !== true);
  };

  return useMemo(
    () => (
      <MenuButton
        active={isOpen}
        disabled={isDisabled}
        iconName={icon}
        onMouseDown={onClickIcon}
        title={title}
      />
    ),
    [isOpen],
  );
};

export default CustomTagInlineComponent;

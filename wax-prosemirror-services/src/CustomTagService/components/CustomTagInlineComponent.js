import React, { useMemo, useState, useContext } from 'react';
import styled from 'styled-components';
import { WaxContext, MenuButton } from 'wax-prosemirror-core';

const StyledButton = styled(MenuButton)`
  svg {
    height: 15px;
    width: 17px;
  }
`;

const CustomTagInlineComponent = ({ view: { state }, item }) => {
  const { icon, title } = item;
  const localInline = JSON.parse(localStorage.getItem('isInline'));
  const [isOpen, setIsOpen] = useState(
    !!(localInline !== null && localInline !== false),
  );

  const {
    pmViews: { main },
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
      <StyledButton
        active={isOpen}
        disabled={isDisabled}
        iconName={icon}
        onMouseDown={onClickIcon}
        title={title}
      />
    ),
    [isOpen, isDisabled],
  );
};

export default CustomTagInlineComponent;

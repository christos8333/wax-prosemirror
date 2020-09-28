import React, { useContext } from 'react';
// import styled from 'styled-components';
// import { ButtonStyles } from 'wax-prosemirror-themes';
import { WaxContext } from 'wax-prosemirror-core';
import MenuButton from '../ui/buttons/MenuButton';

// const ButtonStyled = styled.button`
//   ${ButtonStyles};
//   opacity: ${props => (props.select ? 1 : 0.4)};
//   pointer-events: ${props => (props.select ? 'default' : 'none')};
//   color: ${props => (props.isActive ? 'white' : props.theme.colorButton)};
//   background-color: ${props =>
//     props.isActive ? props.theme.colorPrimary : 'transparent'};
//   &:hover {
//     background-color: ${props =>
//       props.isActive ? props.theme.colorPrimary : 'transparent'};
//   }
// `;

const Button = ({ view = {}, item }) => {
  const { active, enable, icon, label, onlyOnMain, run, select, title } = item;

  const {
    view: { main },
    activeViewId,
  } = useContext(WaxContext);

  if (onlyOnMain) view = main;

  const { dispatch, state } = view;

  const handleMouseDown = e => {
    e.preventDefault();
    run(state, dispatch);
  };

  const isActive = active && active(state);

  const isDisabled =
    enable && !enable(state) && select && select(view.state, activeViewId);

  return (
    <MenuButton
      active={isActive}
      disabled={isDisabled}
      iconName={icon}
      label={label}
      onMouseDown={handleMouseDown}
      title={title}
    />
  );
};

export default Button;

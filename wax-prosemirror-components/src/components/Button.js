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
  const { active, enable, icon, onlyOnMain, run, title } = item;

  // let view = {};

  const {
    view: { main },
    // activeViewId,
  } = useContext(WaxContext);

  if (onlyOnMain) view = main;

  const { dispatch, state } = view;

  const handleClick = e => {
    e.preventDefault();
    run(state, dispatch);
  };

  const isActive = active && active(state);

  const isDisabled = enable && !enable(state);
  // &&
  // item.select &&
  // item.select(view.state, activeViewId);

  // console.log(item);

  // return (
  //   <ButtonStyled
  //     type="button"
  //     isActive={item.active && item.active(view.state)}
  //     title={item.title}
  //     disabled={item.enable && !item.enable(view.state)}
  //     onMouseDown={e => {
  //       e.preventDefault();
  //       item.run(view.state, view.dispatch);
  //     }}
  //     select={item.select && item.select(view.state, activeViewId)}
  //   >
  //     {item.content}
  //   </ButtonStyled>
  // );

  return (
    <MenuButton
      active={isActive}
      disabled={isDisabled}
      iconName={icon}
      onClick={e => handleClick(e)}
      title={title}
    />
  );
};

export default Button;

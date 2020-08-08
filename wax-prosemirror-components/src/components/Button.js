import React, { useContext } from 'react';
import styled from 'styled-components';
import { ButtonStyles } from 'wax-prosemirror-themes';
import { WaxContext } from 'wax-prosemirror-core';

const ButtonStyled = styled.button`
  ${ButtonStyles};
  opacity: ${props => (props.select ? 1 : 0.4)};
  pointer-events: ${props => (props.select ? 'default' : 'none')};
  color: ${props => (props.isActive ? 'white' : props.theme.colorButton)};
  background-color: ${props =>
    props.isActive ? props.theme.colorPrimary : 'transparent'};
  &:hover {
    background-color: ${props =>
      props.isActive ? props.theme.colorPrimary : 'transparent'};
  }
`;

const Button = ({ view = {}, item }) => {
  const {
    view: { main },
    activeViewId,
  } = useContext(WaxContext);
  if (item.onlyOnMain) {
    view = main;
  }

  return (
    <ButtonStyled
      type="button"
      isActive={item.active && item.active(view.state)}
      title={item.title}
      disabled={item.enable && !item.enable(view.state)}
      onMouseDown={e => {
        e.preventDefault();
        item.run(view.state, view.dispatch);
      }}
      select={item.select && item.select(view.state, activeViewId)}
    >
      {item.content}
    </ButtonStyled>
  );
};

export default Button;

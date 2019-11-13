import React from "react";
import styled from "styled-components";
import { ButtonStyles } from "wax-prosemirror-themes";

const ButtonStyled = styled.button`
  opacity: ${props => (props.select ? 1 : 0.4)};
  pointer-events: ${props => (props.select ? "default" : "none")};
  color: ${props =>
    props.isActive ? props.theme.colorPrimary : props.theme.colorButton};
  &:hover {
    color: ${props => (props.isActive ? props.theme.colorPrimary : "#000")};
  }
  ${ButtonStyles};
`;

const tesy = ({ view = {}, item }) => (
  <ButtonStyled
    type="button"
    isActive={item.active && item.active(view.state)}
    title={item.title}
    disabled={item.enable && !item.enable(view.state)}
    onMouseDown={e => {
      e.preventDefault();
      item.run(view.state, view.dispatch);
    }}
    select={item.select && item.select(view.state)}
  >
    {item.content}
  </ButtonStyled>
);

export default tesy;

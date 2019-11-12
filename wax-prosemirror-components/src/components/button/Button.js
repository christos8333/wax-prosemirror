import React from "react";
import styled from "styled-components";

const ButtonStyled = styled.button`
  opacity: ${props => (props.select ? 1 : 0.4)};
  pointer-events: ${props => (props.select ? "default" : "none")};
  background: #fff;
  border: none;
  font-size: inherit;
  cursor: pointer;
  color: ${props =>
    props.isActive ? props.theme.colorPrimary : props.theme.colorButton};
  border-radius: 0;
  padding: 5px 10px;
  &:disabled {
    color: #ccc;
    pointer-events: none;
  }
  &:hover {
    color: #000;
    background: #f6f6f6;
  }
`;

const Button = ({ view = {}, item }) => (
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

export default Button;

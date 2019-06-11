import React from "react";
import styled from "styled-components";
import classnames from "classnames";
import classes from "./Button.module.css";

const ButtonStyled = styled.button`
  opacity: ${props => (props.select ? 1 : 0.4)};
  pointer-events: ${props => (props.select ? "default" : "none")};
`;

const Button = ({ view = {}, item }) => (
  <ButtonStyled
    type="button"
    className={classnames({
      [classes.button]: true,
      [classes.active]: item.active && item.active(view.state)
    })}
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

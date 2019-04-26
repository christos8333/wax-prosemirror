import React from "react";
import styled from "styled-components";
import classnames from "classnames";
import classes from "./Button.module.css";

console.log(classes);
const ButtonStyled = styled.button`
  display: ${props => (props.select ? "inline" : "none")};
`;

const Button = ({ dispatch, state, item }) => (
  <ButtonStyled
    type="button"
    className={classnames({
      [classes.button]: true,
      [classes.active]: item.active && item.active(state)
    })}
    title={item.title}
    disabled={item.enable && !item.enable(state)}
    onMouseDown={e => {
      e.preventDefault();
      item.run(state, dispatch);
    }}
    select={item.select && item.select(state)}
  >
    {item.content}
  </ButtonStyled>
);

export default Button;

import React, { useEffect, useRef, useContext } from "react";
import styled from "styled-components";

const CommentBoxStyled = styled.div`
  height: 50px;
  width: 50px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  background: black;
  position: absolute;
  top: ${props => (props.top ? `${props.top}px` : 0)};
`;

export default ({ mark, view, top }) => {
  return <CommentBoxStyled top={top} />;
};

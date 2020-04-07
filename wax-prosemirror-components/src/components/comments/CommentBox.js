import React, { useEffect, useRef, useContext } from "react";
import styled from "styled-components";

const CommentBoxStyled = styled.div`
  height: 50px;
  width: 50px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  background: black;
`;

export default ({ mark, view }) => {
  useEffect(() => {
    console.log(document.getElementById(mark.attrs.id));
  }, []);

  return <CommentBoxStyled />;
};

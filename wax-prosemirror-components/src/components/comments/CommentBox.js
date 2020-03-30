import React, { useEffect, useRef, useContext } from "react";
import styled from "styled-components";

// export default ({ node, view }) => {
//   useEffect(() => {}, []);
// };

const CommentBoxStyled = styled.div`
  height: 50px;
  width: 50px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  background: black;
`;

const CommentBox = () => <CommentBoxStyled />;
export default CommentBox;

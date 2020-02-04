import React, { useRef } from "react";
import styled from "styled-components";

const NoteEditorContainerStyled = styled.div`
  height: 50px;
  width: 61%;
  margin-left: 14%;
  border: 1px solid black;
`;

const NoteEditorContainer = React.forwardRef((props, ref) => (
  <NoteEditorContainerStyled ref={ref} {...props} />
));

export default NoteEditorContainer;

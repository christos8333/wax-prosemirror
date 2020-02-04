import React from "react";
import styled from "styled-components";

import NoteNumber from "./NoteNumber";

const NoteEditorContainerStyled = styled.div`
  display: flex;
  flex-direction: row;
  height: 50px;
  width: 61%;
  margin-left: 14%;
`;

const NoteStyled = styled.div`
  display: flex;
  width: 96%;
  height: 100%;
  border: 1px solid black;
`;

const NoteEditorContainer = React.forwardRef((props, ref) => (
  <NoteEditorContainerStyled>
    <NoteNumber /> <NoteStyled ref={ref} {...props} />
  </NoteEditorContainerStyled>
));

export default NoteEditorContainer;

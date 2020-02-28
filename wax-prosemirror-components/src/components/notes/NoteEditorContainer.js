import React from "react";
import styled from "styled-components";

import NoteNumber from "./NoteNumber";

const NoteEditorContainerStyled = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 40px;
  width: 100%;
`;

const NoteStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 20px;
  margin-top: 10px;
  height: 100%;
  border-bottom: 1px solid black;
  &:focus {
    outline: none;
  }
`;

const NoteEditorContainer = React.forwardRef((props, ref) => (
  <NoteEditorContainerStyled>
    <NoteNumber /> <NoteStyled ref={ref} {...props} />
  </NoteEditorContainerStyled>
));

export default NoteEditorContainer;

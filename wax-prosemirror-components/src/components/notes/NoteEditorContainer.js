import React from "react";
import styled from "styled-components";

import NoteNumber from "./NoteNumber";

const NoteEditorContainerStyled = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 40px;
  width: 100%;
  position: relative;
`;

const NoteStyled = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 20px;
  margin-top: 10px;
  height: 59%;
  border-bottom: 1px solid black;
  &:focus {
    outline: none;
  }
  span.comment {
    border-bottom: 2px solid #ffab20;
    border-radius: 3px 3px 0 0;
  }
`;

const NoteEditorContainer = React.forwardRef((props, ref) => (
  <NoteEditorContainerStyled>
    <NoteNumber /> <NoteStyled ref={ref} {...props} />
  </NoteEditorContainerStyled>
));

export default NoteEditorContainer;

import React, { useRef } from "react";
import styled from "styled-components";

const NoteEditorContainerStyled = styled.div`
  height: 100px;
  ${"" /* width: 65%;*/} ${"" /* margin-left: 17%;*/}
  border: 1px solid black;
`;

const NoteEditorContainer = ({ ref }) => {
  console.log(ref);
  const editorRef = useRef();
  return <NoteEditorContainerStyled ref={editorRef} />;
};

export default NoteEditorContainer;

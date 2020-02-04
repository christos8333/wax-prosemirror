import React from "react";
import styled from "styled-components";

const NoteNumberStyled = styled.div`
  display: flex;
  width: 2%;
`;

const NoteNumber = ({ number }) => {
  return <NoteNumberStyled>1.</NoteNumberStyled>;
};

export default NoteNumber;

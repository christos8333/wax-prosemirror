import React from "react";
import styled from "styled-components";

const NoteNumberStyled = styled.div`
  display: flex;
  width: 2%;
  &:after {
    content: counter(footnote-view);
    vertical-align: super;
    font-size: 75%;
    counter-increment: footnote-view;
  }
`;

const NoteNumber = ({ number }) => {
  return <NoteNumberStyled />;
};

export default NoteNumber;

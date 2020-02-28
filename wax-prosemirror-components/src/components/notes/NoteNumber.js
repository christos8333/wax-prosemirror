import React from "react";
import styled from "styled-components";

const NoteNumberStyled = styled.div`
  display: flex;
  margin-top: 10px;
  width: 2%;
  &:after {
    content: counter(footnote-view);
    vertical-align: super;
    font-size: 75%;
    counter-increment: footnote-view;
    cursor: pointer;
  }
`;

const onClick = () => {};

const NoteNumber = ({ number }) => {
  return <NoteNumberStyled onClick={onClick} />;
};

export default NoteNumber;

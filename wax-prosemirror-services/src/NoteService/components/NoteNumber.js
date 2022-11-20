/* eslint react/prop-types: 0 */
import React from 'react';
import styled from 'styled-components';

const NoteNumberStyled = styled.div`
  display: flex;
  margin-right: 10px;
  margin-top: 10px;
  position: absolute;
  left: -20px;

  &:after {
    content: counter(footnote-view) '.';
    counter-increment: footnote-view;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
  }
`;

const onClick = () => {};

const NoteNumber = ({ number }) => {
  return <NoteNumberStyled onClick={onClick} />;
};

export default NoteNumber;

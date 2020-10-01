/* eslint react/prop-types: 0 */
import React from 'react';
import styled from 'styled-components';

const NoteNumberStyled = styled.div`
  display: flex;
  margin-top: 12px;
  margin-right: 10px;
  &:after {
    content: counter(footnote-view) '.';
    font-size: 14px;
    font-weight: 500;
    counter-increment: footnote-view;
    cursor: pointer;
  }
`;

const onClick = () => {};

const NoteNumber = ({ number }) => {
  return <NoteNumberStyled onClick={onClick} />;
};

export default NoteNumber;

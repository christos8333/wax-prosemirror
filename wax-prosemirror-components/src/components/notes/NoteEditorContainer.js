import React from 'react';
import { grid } from '@pubsweet/ui-toolkit';
import styled from 'styled-components';

import NoteNumber from './NoteNumber';

const NoteEditorContainerStyled = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 28px;
  width: 90%;
  position: relative;
  margin-bottom: 5px;

  padding-left: ${grid(10)};
`;

const NoteStyled = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 20px;
  margin-top: 10px;
  height: 100%;
  border-bottom: 1px solid black;
  &:focus {
    outline: none;
  }

  p {
    margin: 0;
  }
`;

const NoteEditorContainer = React.forwardRef((props, ref) => (
  <NoteEditorContainerStyled>
    <NoteNumber /> <NoteStyled ref={ref} {...props} />
  </NoteEditorContainerStyled>
));

export default NoteEditorContainer;

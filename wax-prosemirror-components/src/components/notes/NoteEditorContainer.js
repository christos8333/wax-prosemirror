import React from 'react';
import { grid, th } from '@pubsweet/ui-toolkit';
import styled from 'styled-components';

import NoteNumber from './NoteNumber';

const NoteEditorContainerStyled = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: ${grid(6)};
  position: relative;
  margin-bottom: 5px;
  width: 100%;

  .ProseMirror {
    padding-right: ${grid(10)};
    padding-left: ${grid(2)};
    box-shadow: 0 0 8px #ecedf1;
  }
`;

const NoteStyled = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
  margin-top: 10px;
  height: 100%;

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

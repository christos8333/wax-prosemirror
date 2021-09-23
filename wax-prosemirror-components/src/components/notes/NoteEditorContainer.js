/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { grid } from '@pubsweet/ui-toolkit';
import styled from 'styled-components';

import NoteNumber from './NoteNumber';

const NoteEditorContainerStyled = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  padding-left: ${grid(6)};
  position: relative;
  width: 100%;

  .ProseMirror {
    box-shadow: 0 0 8px #ecedf1;
    padding-left: ${grid(2)};
    padding-right: ${grid(10)};
  }
`;

const NoteStyled = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  margin-top: 10px;
  width: 100%;

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

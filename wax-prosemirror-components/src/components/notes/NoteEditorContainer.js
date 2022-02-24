/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { grid } from '@pubsweet/ui-toolkit';
import styled from 'styled-components';

import NoteNumber from './NoteNumber';

const NoteEditorContainerStyled = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  position: relative;
  width: 100%;

  .ProseMirror {
    box-shadow: 0 0 8px #ecedf1;
    line-height: 1.6;
    padding-left: ${grid(2)};
    padding-top: 5px;
    padding-bottom: 5px;
    margin-right: 0;
  }
`;

const NoteStyled = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
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

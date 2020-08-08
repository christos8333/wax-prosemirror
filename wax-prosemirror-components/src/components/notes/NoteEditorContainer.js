import React from 'react';
import styled from 'styled-components';

import NoteNumber from './NoteNumber';

const NoteEditorContainerStyled = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 28px;
  width: 100%;
  position: relative;
  margin-bottom: 5px;
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

  span.comment {
    border-bottom: 2px solid #ffab20;
    border-radius: 3px 3px 0 0;

    .active-comment {
      background-color: #ffab20;
    }
  }

  span.deletion {
    text-decoration: line-through;
    color: red;
  }

  span.insertion {
    color: blue;
  }

  .selected-insertion,
  .selected-deletion,
  .selected-format-change,
  .selected-block-change {
    background-color: #fffacf;
  }

  .format-change {
    border-bottom: 2px solid blue;
  }
`;

const NoteEditorContainer = React.forwardRef((props, ref) => (
  <NoteEditorContainerStyled>
    <NoteNumber /> <NoteStyled ref={ref} {...props} />
  </NoteEditorContainerStyled>
));

export default NoteEditorContainer;

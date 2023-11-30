import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';

import { Wax } from 'wax-prosemirror-core';

import { HhmiLayout } from './layout';
import { config } from './config';

const renderImage = file => {
  const reader = new FileReader();
  return new Promise((accept, fail) => {
    reader.onload = () => accept(reader.result);
    reader.onerror = () => fail(reader.error);
    // Some extra delay to make the asynchronicity visible
    setTimeout(() => reader.readAsDataURL(file), 200);
  });
};

const ButtonContainer = styled.div`
  position: absolute;
  right: 80px;
  top: 16px;
`;

const NormalButton = styled.button`
  margin-right: 10px;

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${props =>
    props.isActive &&
    css`
      background-color: gray;
      color: white;
    `}
`;

const ReadOnlyButton = styled.button`
  margin-right: 10px;

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${props =>
    props.isActive &&
    css`
      background-color: gray;
      color: white;
    `}
`;

const TestModeButton = styled.button`
  margin-right: 10px;

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${props =>
    props.isActive &&
    css`
      background-color: gray;
      color: white;
    `}
`;

const SubmitButton = styled.button`
  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${props =>
    props.isActive &&
    css`
      background-color: gray;
      color: white;
    `}
`;

// const initialContent = {
//   type: 'doc',
//   content: [
//     {
//       type: 'numerical_answer_container',
//       attrs: {
//         id: 'f9c33d03-68ee-4c27-8a03-5072447fac1a',
//         class: 'numerical-answer',
//         feedback: '',
//         answerType: 'exactAnswer',
//         answersExact: [],
//       },
//       content: [
//         {
//           type: 'paragraph',
//           attrs: {
//             class: 'paragraph',
//           },
//         },
//       ],
//     },
//   ],
// };

const initialContent = ``;

const Hhmi = () => {
  const [stateProps, setStateProps] = useState({
    readOnly: false,
    testMode: false,
    submitted: false,
    content: initialContent,
  });

  const normalQuestions = () => {
    setStateProps({
      readOnly: false,
      testMode: false,
      submitted: false,
      content: editorRef.current.getContent(),
    });
  };

  const readOnlyQuestions = () => {
    setStateProps({
      readOnly: true,
      testMode: false,
      submitted: false,
      content: editorRef.current.getContent(),
    });
  };

  const testModeQuestions = () => {
    setStateProps({
      readOnly: true,
      testMode: true,
      submitted: false,
      content: editorRef.current.getContent(),
    });
  };

  const submitQuestions = () => {
    setStateProps({
      readOnly: true,
      testMode: false,
      submitted: true,
      content: editorRef.current.getContent(),
    });
  };

  const editorRef = useRef();

  const { readOnly, testMode, submitted, content } = stateProps;

  return (
    <>
      <ButtonContainer>
        <NormalButton isActive={!readOnly} onClick={normalQuestions}>
          Normal
        </NormalButton>
        <ReadOnlyButton
          isActive={readOnly && !submitted && !testMode}
          onClick={readOnlyQuestions}
        >
          Read Only
        </ReadOnlyButton>
        <TestModeButton isActive={testMode} onClick={testModeQuestions}>
          Test Mode
        </TestModeButton>
        <SubmitButton isActive={submitted} onClick={submitQuestions}>
          Submit
        </SubmitButton>
      </ButtonContainer>
      <Wax
        config={config}
        autoFocus
        ref={editorRef}
        customValues={{ showFeedBack: submitted, testMode }}
        fileUpload={file => renderImage(file)}
        value={content}
        // targetFormat="JSON"
        readonly={readOnly}
        layout={HhmiLayout}
        // onChange={source => console.log(source)}
      />
    </>
  );
};

export default Hhmi;

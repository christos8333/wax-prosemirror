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
    setTimeout(() => reader.readAsDataURL(file), 4150);
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

const initialContent = `<p class="paragraph"></p>
<div id="1624fa06-2075-488a-9912-9794a3763aca" class="multiple-drop-down-container" feedback="">
   <p class="paragraph">Lorem ipsum dolor sit amet,<span id="fa9ff44d-19a6-4f47-99d9-d77d3dc02fbf" class="multiple-drop-down-option" options="[{&quot;label&quot;:&quot;option 1&quot;,&quot;value&quot;:&quot;6c4aa0f3-43b1-40a7-a066-bc73449523df&quot;},{&quot;label&quot;:&quot;option 2&quot;,&quot;value&quot;:&quot;29365b0c-c00d-40c1-8a5e-118dbdf47e50&quot;},{&quot;label&quot;:&quot;option 3&quot;,&quot;value&quot;:&quot;743a425e-6340-4a72-a07c-d2e78154fcc8&quot;}]" correct="6c4aa0f3-43b1-40a7-a066-bc73449523df" answer="29365b0c-c00d-40c1-8a5e-118dbdf47e50"></span>consectetur adipiscing elit. Nulla cursus ultricies enim, id condimentum dui facilisis a. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed euismod posuere orci. Praesent consectetur augue ut lorem suscipit, nec molestie libero pellentesque.</p>
   <p class="paragraph">Nullam porttitor ligula neque. In aliquam<span id="f8380222-11fa-46e7-91a9-0bf67ff3d1d7" class="multiple-drop-down-option" options="[{&quot;label&quot;:&quot;option 4&quot;,&quot;value&quot;:&quot;4e2c45fe-0aad-4c59-9a92-ed44f01a82e2&quot;},{&quot;label&quot;:&quot;option 5&quot;,&quot;value&quot;:&quot;15e27b91-682a-4e10-a5d0-149192fd2e4c&quot;},{&quot;label&quot;:&quot;option 6&quot;,&quot;value&quot;:&quot;886c921d-2e75-41ea-a1a6-2d49e7921a57&quot;},{&quot;label&quot;:&quot;option 7&quot;,&quot;value&quot;:&quot;d14c2409-f66a-47d1-8f63-72686d24df37&quot;}]" correct="4e2c45fe-0aad-4c59-9a92-ed44f01a82e2" answer="4e2c45fe-0aad-4c59-9a92-ed44f01a82e2"></span> ex neque, sit amet sagittis nulla volutpat sed. Nulla blandit facilisis ante, vel tempus ante porta quis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer nulla tellus, dictum at laoreet eu, hendrerit at quam. Sed consectetur, neque vel ornare malesuada, eros sem commodo purus, <span id="c13f5243-03c0-433c-8e44-440d536d9150" class="multiple-drop-down-option" options="[{&quot;label&quot;:&quot;option 9&quot;,&quot;value&quot;:&quot;3b9cd3b4-9e70-45de-975d-31407c48812c&quot;},{&quot;label&quot;:&quot;option 10&quot;,&quot;value&quot;:&quot;3baf86a8-a3fa-4e64-bfe8-f01ce4320489&quot;},{&quot;label&quot;:&quot;option 11&quot;,&quot;value&quot;:&quot;f1c6023c-5cde-445a-b9fb-cc23f06c8132&quot;}]" correct="f1c6023c-5cde-445a-b9fb-cc23f06c8132" answer="f1c6023c-5cde-445a-b9fb-cc23f06c8132"></span> sagittis volutpat elit leo in diam. Aliquam mattis, est non placerat euismod, nisl nisl vestibulum mauris, non interdum dui urna et tellus.</p>
</div>
<p class="paragraph"></p>
<div id="2257aaf4-20cf-44ff-bd45-0e0a4561b764" class="matching-container" options="[{&quot;label&quot;:&quot;option 1&quot;,&quot;value&quot;:&quot;941cebeb-58bd-44c5-bf42-c78d20c23b7a&quot;},{&quot;label&quot;:&quot;option 2&quot;,&quot;value&quot;:&quot;ab2e7cfc-c700-4ba2-9ac3-3040974f67bf&quot;}]" feedback="">
   <p class="paragraph">
   <div id="2bf9d3ca-166d-4354-9ebf-5d0fc6e75d8d" class="matching-option" isfirst="true" answer="">some text</div>
   </p>
</div>
<div id="d4fa43fc-3a92-4591-a8a4-e6271e42fc323" class="multiple-choice">
   <div class="multiple-choice-question" id="38de8538-647a-489d-8474-f92d0d256c32">
      <p class="paragraph">question</p>
   </div>
   <div class="multiple-choice-option" id="debb868e-bbfe-4ba2-bf93-c963153ff791" correct="false" answer="false" feedback="feedback 1">
      <p class="paragraph">answer 1</p>
   </div>
   <div class="multiple-choice-option" id="810bcf10-4fcb-4d1e-9dab-ce35cbd28527" correct="true" answer="false" feedback="feedback 2">
      <p class="paragraph">answer 2</p>
   </div>
</div>
<div id="d4fa43fc-3a92-4591-a8a4-e6271e42fc02" class="fill-the-gap" feedback="some feedback">
   <p class="paragraph">first <span id="16ec8f33-db5b-4839-9567-8aa73b776bcf" class="fill-the-gap" answer="">answer1; answer2; answer3</span> second <span id="72f23a71-e774-4834-acba-f357afb6a243" class="fill-the-gap" answer="">answer 4; answer5;</span></p>
</div>`;

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
        readonly={readOnly}
        layout={HhmiLayout}
        onChange={source => console.log(source)}
      />
    </>
  );
};

export default Hhmi;

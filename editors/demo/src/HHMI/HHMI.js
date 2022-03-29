import React, { useState } from 'react';
import styled from 'styled-components';

import { Wax } from 'wax-prosemirror-core';

import { HhmiLayout } from './layout';
import { config } from './config';

const renderImage = file => {
  const reader = new FileReader();
  return new Promise((accept, fail) => {
    reader.onload = () => accept(reader.result);
    reader.onerror = () => fail(reader.error);
    // Some extra delay to make the asynchronicity visible
    setTimeout(() => reader.readAsDataURL(file), 150);
  });
};

const ReadOnlyButton = styled.button`
  position: absolute;
  left: 550px;
  top: 16px;
`;

const SubmitButton = styled.button`
  position: absolute;
  left: 650px;
  top: 16px;
`;

const t = `<p class="paragraph"></p>
<div id="1c3b3bc9-8a82-4fae-9f00-5f3a2605d891" class="matching-container" answers="" feedback=""><p class="paragraph"><div class="matching-option" id="5677a6df-7211-481f-b0d7-94565c87bdbd" correct="false" answer="false"></div></p><p class="paragraph"></p></div><p class="paragraph">s</p><div id="d4fa43fc-3a92-4591-a8a4-e6271e42fc323" class="multiple-choice"><div class="multiple-choice-question" id="38de8538-647a-489d-8474-f92d0d256c32"><p class="paragraph">question</p></div><div class="multiple-choice-option" id="debb868e-bbfe-4ba2-bf93-c963153ff791" correct="false" answer="false" feedback="feedback 1"><p class="paragraph">answer 1</p></div><div class="multiple-choice-option" id="810bcf10-4fcb-4d1e-9dab-ce35cbd28527" correct="true" answer="true" feedback="feedback 2"><p class="paragraph">answer 2</p></div></div><div id="d4fa43fc-3a92-4591-a8a4-e6271e42fc02" class="fill-the-gap" feedback="some feedback"><p class="paragraph">first <span id="16ec8f33-db5b-4839-9567-8aa73b776bcf" class="fill-the-gap" anser="">answer1; answer2; answer3</span> second <span id="72f23a71-e774-4834-acba-f357afb6a243" class="fill-the-gap" anser="">answer 4; answer5;</span></p></div>`;
const Hhmi = () => {
  const [submited, isSubmited] = useState(false);
  const [readOnly, isReadOnly] = useState(false);

  const readOnlyQuestions = () => {
    isReadOnly(true);
  };

  const submitQuestions = () => {
    isSubmited(true);
    isReadOnly(true);
  };

  return (
    <>
      <ReadOnlyButton onClick={readOnlyQuestions}>Read Only</ReadOnlyButton>
      <SubmitButton onClick={submitQuestions}>Submit</SubmitButton>
      <Wax
        config={config}
        autoFocus
        customValues={{ showFeedBack: submited }}
        fileUpload={file => renderImage(file)}
        value={t}
        readonly={readOnly}
        layout={HhmiLayout}
        // onChange={source => console.log(source)}
      />
    </>
  );
};

export default Hhmi;

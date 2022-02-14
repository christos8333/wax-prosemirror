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

const SubmitButton = styled.button`
  position: absolute;
  left: 600px;
  top: 16px;
`;

const t = `<p class="paragraph"></p><div id="" class="multiple-choice"><div class="multiple-choice-question" id="38de8538-647a-489d-8474-f92d0d256c32"><p class="paragraph">question </p></div><div class="multiple-choice-option" id="debb868e-bbfe-4ba2-bf93-c963153ff791" correct="false" correctanswer="false" feedback="feedback 1"><p class="paragraph">answer 1</p></div><div class="multiple-choice-option" id="810bcf10-4fcb-4d1e-9dab-ce35cbd28527" correct="true" correctanswer="false" feedback="feedback 2"><p class="paragraph">answer 2</p></div></div>`;

const Hhmi = () => {
  const [submited, isSubmited] = useState(false);
  const submitQuestions = () => {
    isSubmited(true);
  };

  return (
    <>
      <SubmitButton onClick={submitQuestions}>Submit</SubmitButton>
      <Wax
        config={config}
        autoFocus
        customValues={{ showFeedBack: submited }}
        fileUpload={file => renderImage(file)}
        value={t}
        // readonly
        layout={HhmiLayout}
        onChange={source => console.log(source)}
      />
    </>
  );
};

export default Hhmi;

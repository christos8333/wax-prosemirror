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

const t = `<p class="paragraph"></p></div><div id="d4fa43fc-3a92-4591-a8a4-e6271e42fc323" class="multiple-choice"><div class="multiple-choice-question" id="38de8538-647a-489d-8474-f92d0d256c32"><p class="paragraph">question</p></div><div class="multiple-choice-option" id="debb868e-bbfe-4ba2-bf93-c963153ff791" correct="false" answer="false" feedback="feedback 1"><p class="paragraph">answer 1</p></div><div class="multiple-choice-option" id="810bcf10-4fcb-4d1e-9dab-ce35cbd28527" correct="true" answer="true" feedback="feedback 2"><p class="paragraph">answer 2</p></div></div><div id="d4fa43fc-3a92-4591-a8a4-e6271e42fc02" class="fill-the-gap" feedback="some feedback"><p class="paragraph">first <span id="16ec8f33-db5b-4839-9567-8aa73b776bcf" class="fill-the-gap" answer="">answer1; answer2; answer3</span> second <span id="72f23a71-e774-4834-acba-f357afb6a243" class="fill-the-gap" answer="">answer 4; answer5;</span></p></div>`;
const aa = `<p class="paragraph"></p><div id="3166af11-2905-4426-afd6-620cc7044b3f" class="multiple-drop-down-container" feedback="" correct="b4543396-d41f-4167-b9fd-a505d5d73715"><p class="paragraph">etrt etre t<span id="306f1656-3319-4cb5-ab9a-53e28354501d" class="multiple-drop-down-option" options="[{&quot;label&quot;:&quot;ert eterter&quot;,&quot;value&quot;:&quot;9a871b4b-a7bd-486c-a060-9665e59d89fa&quot;},{&quot;label&quot;:&quot;etertrte&quot;,&quot;value&quot;:&quot;5bd745c6-6bc9-40a8-8188-86590ceff7e3&quot;},{&quot;label&quot;:&quot;eterter&quot;,&quot;value&quot;:&quot;b4543396-d41f-4167-b9fd-a505d5d73715&quot;}]"></span> </p></div>`;
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
        value={aa}
        readonly={readOnly}
        layout={HhmiLayout}
        onChange={source => console.log(source)}
      />
    </>
  );
};

export default Hhmi;

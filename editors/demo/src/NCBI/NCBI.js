import React, { useState } from 'react';

import { Wax } from 'wax-prosemirror-core';
import styled from 'styled-components';

import { NcbiLayout, NcbiMiniLayout, EnterLayout } from './layout';
import { configTitle, configMini, configEnter } from './config';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  width: 100%;
`;

const FirstTwoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 50px;
  width: 100%;
`;

const FirstEditor = styled.div`
  margin-right: 20px;
`;

const SecondEditor = styled.div``;

const TitleEditor = styled.div`
  background: #fff;
  height: 20px;
  position: relative;
  top: 2px;
  width: 80px;
`;

const TitleEditorExport = styled.div`
  background: #fff;
  height: 20px;
  position: relative;
  top: 2px;
  width: 120px;
`;

const ThirdEditorWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ThirdEditor = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentArea = styled.div`
  height: 200px;
  border: 1px solid black;
  overflow-y: auto;
`;

const Ncbi = () => {
  const [content, setContent] = useState('');

  const getContent = source => {
    setContent(savedContent => `${savedContent} ${source}`);
  };

  return (
    <Wrapper>
      <FirstTwoWrapper>
        <FirstEditor>
          <TitleEditor>Basic Editor</TitleEditor>

          <Wax
            config={configMini}
            autoFocus
            value=""
            layout={NcbiMiniLayout}
            placeholder="Start Typing ..."
          />
        </FirstEditor>
        <SecondEditor>
          <TitleEditor>Title Editor</TitleEditor>
          <Wax
            config={configTitle}
            value="This is a really really really long title that you cannot break into multiple lines"
            layout={NcbiLayout}
          />
        </SecondEditor>
      </FirstTwoWrapper>
      <ThirdEditorWrapper>
        <ThirdEditor>
          <TitleEditorExport>Export On Enter</TitleEditorExport>
          <ContentArea dangerouslySetInnerHTML={{ __html: content }} />
          <Wax
            config={configEnter(getContent)}
            autoFocus
            layout={EnterLayout}
            placeholder="Start Typing and press enter..."
          />
        </ThirdEditor>
      </ThirdEditorWrapper>
    </Wrapper>
  );
};

export default Ncbi;

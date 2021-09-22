import React from 'react';

import { Wax } from 'wax-prosemirror-core';
import styled from 'styled-components';

import { NcbiLayout, NcbiMiniLayout } from './layout';
import { configTitle, configMini } from './config';

const Wrapper = styled.div`
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

const Ncbi = () => {
  return (
    <>
      <Wrapper>
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
      </Wrapper>
    </>
  );
};

export default Ncbi;

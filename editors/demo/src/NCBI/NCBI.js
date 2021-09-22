import React from 'react';

import { Wax } from 'wax-prosemirror-core';
import styled from 'styled-components';

import { NcbiLayout, NcbiMiniLayout } from './layout';
import { configTitle, configMini } from './config';

const Wrapper = styled.div`
  padding: 50px;
`;

const Divider = styled.div`
  height: 50px;
  width: 100%;
`;

const Ncbi = () => {
  return (
    <>
      <Wrapper>
        <Wax
          config={configTitle}
          autoFocus
          value="This is a really really really long title that you cannot break into multiple lines"
          layout={NcbiLayout}
        />
        <Divider></Divider>

        <Wax config={configMini} autoFocus value="" layout={NcbiMiniLayout} />
      </Wrapper>
    </>
  );
};

export default Ncbi;

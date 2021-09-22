import React from 'react';

import { Wax } from 'wax-prosemirror-core';
import styled from 'styled-components';

import { NcbiLayout } from './layout';
import { configTitle } from './config';

const Wrapper = styled.div`
  padding: 50px;
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
      </Wrapper>
    </>
  );
};

export default Ncbi;

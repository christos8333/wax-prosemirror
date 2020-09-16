import React from 'react';
import styled from 'styled-components';
// import { lorem } from 'faker'

import InsertTableTool from '../../wax-prosemirror-components/src/ui/tables/InsertTableTool';

const Wrapper = styled.div`
  height: 450px;
`;

export const Base = () => (
  <Wrapper>
    <InsertTableTool />
  </Wrapper>
);

export default {
  component: InsertTableTool,
  title: 'Tables/Table Tool',
};

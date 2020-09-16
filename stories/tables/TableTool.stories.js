import React from 'react';
import styled from 'styled-components';
// import { lorem } from 'faker'

import TableTool from '../../wax-prosemirror-components/src/ui/tables/TableTool';

const Wrapper = styled.div`
  height: 450px;
`;

export const Base = () => (
  <Wrapper>
    <TableTool />
  </Wrapper>
);

export default {
  component: TableTool,
  title: 'Tables/Table Tool',
};

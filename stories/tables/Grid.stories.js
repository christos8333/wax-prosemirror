import React from 'react';
import styled from 'styled-components';
// import { lorem } from 'faker'

import Grid from '../../wax-prosemirror-components/src/ui/tables/Grid';

const Wrapper = styled.div`
  height: 400px;
`;

export const Base = () => (
  <Wrapper>
    <Grid />
  </Wrapper>
);

export default {
  component: Grid,
  title: 'Tables/Grid',
};

import React, { useRef, useMemo, useContext, useState } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import styled from 'styled-components';
import { grid } from '@pubsweet/ui-toolkit';

const Wrapper = styled.div`
  font-size: 16px;
  color: black;
  min-width: 400px;
  background: grey;
`;

const FindAndReplaceComponent = () => {
  return <Wrapper> this is the find and replace component</Wrapper>;
};

export default FindAndReplaceComponent;

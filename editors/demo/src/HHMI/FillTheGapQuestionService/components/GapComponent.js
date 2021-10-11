import React from 'react';
import styled from 'styled-components';
import EditorComponent from './EditorComponent';

const Gap = styled.span`
  color: red;
  text-decoration: underline;
`;

export default ({ node, view, getPos }) => {
  return <Gap> Gap</Gap>;
};

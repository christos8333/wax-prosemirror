/* eslint react/prop-types: 0 */
import React from 'react';
import styled from 'styled-components';
import { grid } from '@pubsweet/ui-toolkit';
import { WaxContext } from 'wax-prosemirror-core';
import Icon from '../../helpers/Icon';

const Wrapper = styled.div`
  width: 400px;
  background: #fff;
  font-size: 14px;
  border-radius: 1.03093% / 8%;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px 0px,
    rgba(9, 30, 66, 0.31) 0px 0px 1px 0px;
  transform-origin: 50% 50% 0px;
  padding: ${grid(2)};
`;

const SpecialCharactersComponent = ({ close }) => {
  return <Wrapper>Special Characters</Wrapper>;
};

export default SpecialCharactersComponent;

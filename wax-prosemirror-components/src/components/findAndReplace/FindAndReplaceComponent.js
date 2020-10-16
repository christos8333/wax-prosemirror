import React, { useRef, useMemo, useContext, useState } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import styled from 'styled-components';
import { grid, th } from '@pubsweet/ui-toolkit';
import Icon from '../../helpers/Icon';

const Wrapper = styled.div`
  width: 400px;
  background: ${th('colorBackgroundHue')};
  border-radius: 1.03093% / 8%;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px 0px,
    rgba(9, 30, 66, 0.31) 0px 0px 1px 0px;
  transform: rotate(0deg);
  transform-origin: 50% 50% 0px;
  padding: ${grid(2)};
`;

const SingleRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const SearchInput = styled.input`
  font-size: 15px;
  font-weight: 400;
  border-radius: 2px;
  border: none;
  padding: ${grid(1)};
  width: 80%;
  box-shadow: inset 0 0 0 1px rgba(27, 43, 75, 0.28);
  ::placeholder {
    color: #d8dae0;
  }
  &:focus {
    outline: none;
  }
`;

const StyledIcon = styled(Icon)`
  height: 24px;
  width: 24px;
  cursor: pointer;
`;

const FindAndReplaceComponent = () => {
  return (
    <Wrapper>
      <SingleRow>
        <SearchInput type="text" placeholder="Find" value="" />
        <StyledIcon name="navigatePrevious" />
        <StyledIcon name="navigateNext" />
        <StyledIcon name="more" />
      </SingleRow>
    </Wrapper>
  );
};

export default FindAndReplaceComponent;

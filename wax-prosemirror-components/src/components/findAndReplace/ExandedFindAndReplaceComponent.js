/* eslint react/prop-types: 0 */

import React from 'react';
import styled from 'styled-components';
import { grid, th } from '@pubsweet/ui-toolkit';
import Icon from '../../helpers/Icon';
import CheckBox from '../../ui/inputs/CheckBox';

const Wrapper = styled.div`
  font-size: 15px;
  width: 400px;
  height: 300px;
  background: ${th('colorBackgroundHue')};
  font-family: ${th('fontTools')};
  border-radius: 1.03093% / 8%;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px 0px,
    rgba(9, 30, 66, 0.31) 0px 0px 1px 0px;
  transform: rotate(0deg);
  transform-origin: 50% 50% 0px;
  padding: ${grid(2)};
`;

const FindTitle = styled.span`
  font-size: 16px;
  color: #4b5871;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const InputLabel = styled.div`
  padding: ${grid(2)} ${grid(0)} ${grid(2)} ${grid(0)};
  font-size: 16px;
  color: #4b5871;
`;

const StyledIcon = styled(Icon)`
  height: 24px;
  width: 24px;
  cursor: pointer;
`;

const CloseWrapper = styled.div`
  margin-left: auto;
  border-left: 1px solid #e0e2e7;
`;

const FindReplaceInput = styled.input`
  font-size: 15px;
  font-weight: 400;
  border-radius: 2px;
  border: none;
  padding: ${grid(1)};
  width: 98%;
  box-shadow: inset 0 0 0 1px rgba(27, 43, 75, 0.28);
  ::placeholder {
    color: #d8dae0;
  }
  &:focus {
    outline: none;
  }
`;

const CheckBoxWrapper = styled.div`
  margin-top: 20px;
`;

const ControlContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 80px;
`;

const ExandedFindAndReplaceComponent = ({ close }) => {
  const closeFind = () => {
    close();
  };

  return (
    <Wrapper>
      <TitleContainer>
        <FindTitle> Find & Replace </FindTitle>
        <CloseWrapper onClick={closeFind}>
          <StyledIcon name="close" />
        </CloseWrapper>
      </TitleContainer>
      <InputLabel>Find</InputLabel>
      <FindReplaceInput type="text" placeholder="Something is this doc" />
      <InputLabel>Replace with</InputLabel>
      <FindReplaceInput type="text" placeholder="Replace phrase" />
      <CheckBoxWrapper>
        <CheckBox name="case-sensitive" />
      </CheckBoxWrapper>
      <ControlContainer>
        <button>Replace</button>
        <button>Replace All</button>
        <StyledIcon name="navigatePrevious" />
        <StyledIcon name="navigateNext" />
      </ControlContainer>
    </Wrapper>
  );
};

export default ExandedFindAndReplaceComponent;

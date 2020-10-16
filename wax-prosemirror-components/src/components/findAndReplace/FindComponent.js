/* eslint react/prop-types: 0 */

import React from 'react';
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
  width: 73%;
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

const CloseWrapper = styled.div`
  border-left: 1px solid #e0e2e7;
  margin-left: 1%;
`;

const ExpandedWrapper = styled.div``;

const FindComponent = ({ close, expand }) => {
  const onChange = () => {};

  const closeFind = () => {
    close();
  };

  const showExpanded = () => {
    console.log('expanded');
    expand();
  };

  return (
    <Wrapper>
      <SingleRow>
        <SearchInput
          type="text"
          placeholder="Find"
          value=""
          onChange={onChange}
        />
        <StyledIcon name="navigatePrevious" />
        <StyledIcon name="navigateNext" />

        <ExpandedWrapper onClick={showExpanded}>
          <StyledIcon name="more" />
        </ExpandedWrapper>

        <CloseWrapper onClick={closeFind}>
          <StyledIcon name="close" />
        </CloseWrapper>
      </SingleRow>
    </Wrapper>
  );
};

export default FindComponent;

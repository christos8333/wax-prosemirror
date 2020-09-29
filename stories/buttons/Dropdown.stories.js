import React from 'react';
import styled from 'styled-components';

import Dropdown from '../../wax-prosemirror-components/src/ui/buttons/Dropdown';

const Wrapper = styled.div`
  height: 150px;
`;

// const RightWrapper = styled(Wrapper)`
//   display: flex;
//   justify-content: flex-end;
// `;

const DropElement = styled.div`
  background: palegoldenrod;
  height: 100px;
  width: 100px;
`;

export const Base = () => (
  <Wrapper>
    <Dropdown iconName="bold" dropComponent={<DropElement />} />
  </Wrapper>
);

// export const RightSide = () => (
//   <RightWrapper>
//     <Dropdown iconName="bold" />
//   </RightWrapper>
// );

export default {
  component: Dropdown,
  title: 'Buttons/Dropdown',
};

import React from 'react';
import styled from 'styled-components';
import { grid } from '@pubsweet/ui-toolkit';

const Wrapper = styled.div`
  background: #fff;
  border-radius: 1.03093% / 8%;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px 0px,
    rgba(9, 30, 66, 0.31) 0px 0px 1px 0px;
  padding: ${grid(2)};
  transform-origin: 50% 50% 0px;
  width: 200px;
  height: 200px;
`;

const TrackChangeOptionsComponent = ({ view = {}, groups }) => {
  console.log(groups);
  return (
    <Wrapper>
      <span>Options</span>
    </Wrapper>
  );
};

export default TrackChangeOptionsComponent;

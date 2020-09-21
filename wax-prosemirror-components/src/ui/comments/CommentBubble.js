import React from 'react';
import styled from 'styled-components';

/**
 * SVG source
 * https://material.io/resources/icons/?search=chat&icon=chat&style=baseline
 */

const Wrapper = styled.div`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.1s ease-in;

  &:hover {
    background: gainsboro;
    cursor: pointer;
  }
`;

const IconSVG = props => {
  const { className } = props;

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M0 0h24v24H0z" fill="none" />

      <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
    </svg>
  );
};

const Icon = styled(IconSVG)`
  height: 28px;
  width: 28px;
  fill: gray;
`;

const Bubble = props => {
  const { onClick } = props;

  return (
    <Wrapper onClick={onClick}>
      <Icon />
    </Wrapper>
  );
};

export default Bubble;

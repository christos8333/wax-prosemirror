import styled, { css } from 'styled-components';

export default css`
  background: #fff;
  border: none;
  font-size: inherit;
  cursor: pointer;
  border-radius: 0;
  padding: 5px 10px;
  &:disabled {
    color: #ccc;
    pointer-events: none;
  }
  &:hover {
    background: #f6f6f6;
  }
`;

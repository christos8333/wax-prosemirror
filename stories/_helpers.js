/* eslint-disable react/prop-types */

import React from 'react';
import styled from 'styled-components';

const DemoWrapper = styled.div`
  margin-bottom: 24px;
  border-bottom: 1px solid gray;
  padding: 12px;
  display: flex;
  justify-content: flex-end;

  > span {
    background: gray;
    color: white;
    margin-left: 8px;
    padding: 4px 8px;
  }
`;

const Demo = props => {
  const { buttonText, children, onClickButton } = props;
  const noop = () => {};

  return (
    <>
      <DemoWrapper>
        <button onClick={onClickButton || noop} type="button">
          {buttonText || 'Reset state'}
        </button>
        <span>demo purposes only</span>
      </DemoWrapper>

      {children}
    </>
  );
};

const Note = styled.p`
  width: 400px;
  background: gainsboro;
  padding: 12px;
  text-align: justify;
  border-radius: 4px;
`;

export { Demo, Note };

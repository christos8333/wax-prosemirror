/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';

const OverlayContainer = styled.div`
  left: ${props => `${props.position.left}px`};
  position: ${props => props.position.position};
  top: ${props => `${props.position.top}px`};
  // z-index: 999;
`;

const Overlay = props => (
  <OverlayContainer {...props}>{props.children}</OverlayContainer>
);

export default Overlay;

import React from "react";
import styled from "styled-components";
const OverlayContainer = styled.div`
  position: ${props => props.position.position};
  left: ${props => `${props.position.left}px`};
  top: ${props => `${props.position.top}px`};
`;

const Overlay = props => (
  <OverlayContainer {...props}>{props.children}</OverlayContainer>
);

export default Overlay;

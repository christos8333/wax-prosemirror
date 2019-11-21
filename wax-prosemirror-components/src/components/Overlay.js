import React from "react";
import styled from "styled-components";

const OverlayContainer = styled.div`
  position: absolute;
  top: 10px;
`;

const Overlay = props => <OverlayContainer>{props.children}</OverlayContainer>;

export default Overlay;

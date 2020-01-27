import React from "react";
import styled from "styled-components";

const InfoAreaContainer = styled.div`
  ${"" /* height: ${props => (props.height ? props.height : "30px")};
  position: fixed;
  bottom: 0;
  z-index: 9999;
  background: #efefef;
  width: 100%;*/};
`;

const InfoArea = () => <InfoAreaContainer />;

export default InfoArea;

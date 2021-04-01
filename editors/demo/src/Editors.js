import React from 'react';
import { createGlobalStyle } from 'styled-components';

import Editoria from './Editoria/Editoria';
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    overflow-y: hidden;
    padding: 0;
  }

  #root {
    height:100vh;
    width:100vw;
  }
`;

const Editors = () => {
  return (
    <>
      <GlobalStyle />
      <Editoria />
    </>
  );
};

export default Editors;

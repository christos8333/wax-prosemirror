import styled from "styled-components";
import React, { Fragment } from "react";

import { MainMenuBar, SideMenuBar } from "wax-prosemirror-components";

const WaxSurfaceContainer = styled.div`
  flex: 1;
  position: relative;
  z-index: 1;
`;

const EditoriaLayout = ({ editor, view, ...props }) => (
  <Fragment>
    <MainMenuBar view={view} {...props} />
    <WaxSurfaceContainer>
      <SideMenuBar view={view} {...props} />
      {editor}
    </WaxSurfaceContainer>
  </Fragment>
);

export default EditoriaLayout;

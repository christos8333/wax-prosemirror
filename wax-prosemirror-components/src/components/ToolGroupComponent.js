import React, { useState } from "react";
import { isFunction } from "lodash";
import styled from "styled-components";
import icons from "../icons/icons";

const ToolGroupStyled = styled.div`
  border-right: 1px solid #ecedf1;
  &:last-child {
    border-right: none;
  }
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const InnerStyled = styled.div`
  display: flex;
  width: 0;
  top: 40px;
  position: relative;
  right: 100%;
`;

const ToolGroupComponent = ({ view, tools, name, title }) => {
  const [more, showHide] = useState(false),
    toolsShown = [],
    rest = [],
    DisplayTitle = isFunction(title) ? title : () => title;

  tools.forEach(tool => {
    tool.hideOnToolbar
      ? rest.push(tool.renderTool(view))
      : toolsShown.push(tool.renderTool(view));
  });

  return (
    <ToolGroupStyled data-name={name}>
      <DisplayTitle />
      {toolsShown}
      {rest.length && !more ? (
        <MoreButton title="show more tools" onClick={() => showHide(!more)}>
          {icons.ellipses}
        </MoreButton>
      ) : null}
      {more && (
        <div>
          <MoreButton title="hide" onClick={() => showHide(!more)}>
            {icons.ellipses}
          </MoreButton>
          <InnerStyled>{rest}</InnerStyled>
        </div>
      )}
    </ToolGroupStyled>
  );
};

export default ToolGroupComponent;

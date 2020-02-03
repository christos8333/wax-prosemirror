import React, { useState } from "react";
import { isFunction } from "lodash";
import styled from "styled-components";

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
    <div>
      <DisplayTitle />
      {toolsShown}
      {rest.length && !more ? (
        <button onClick={() => showHide(!more)}>...</button>
      ) : null}
      {more && (
        <div>
          <button onClick={() => showHide(!more)}>...</button>
          <InnerStyled>{rest}</InnerStyled>
        </div>
      )}
    </div>
  );
};

export default ToolGroupComponent;

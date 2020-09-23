import React from 'react';
import { isFunction } from 'lodash';
import styled from 'styled-components';

import Dropdown from '../ui/buttons/Dropdown';

const Wrapper = styled.div`
  background: #fff;
  display: inline-flex;
  align-items: center;
  padding: 0 4px;

  > button,
  > div {
    margin: 0 2px;
  }
`;

const DropWrapper = styled(Wrapper)`
  border: 1px solid gray;
  padding: 4px;
`;

const ToolGroupComponent = ({ view, tools, name, title }) => {
  const toolsShown = [];
  const rest = [];
  const DisplayTitle = isFunction(title) ? title : () => title;

  tools.forEach(tool => {
    tool.isIntoMoreSection() && tool.isDisplayed()
      ? rest.push(tool.renderTool(view))
      : toolsShown.push(tool.renderTool(view));
  });

  return (
    <Wrapper data-name={name}>
      {/* <DisplayTitle /> */}
      {toolsShown}
      {rest.length > 0 && (
        <Dropdown
          iconName="more"
          dropComponent={<DropWrapper>{rest}</DropWrapper>}
          title="Show more tools"
        />
      )}
    </Wrapper>
  );
};

export default ToolGroupComponent;

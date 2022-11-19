/* eslint react/prop-types: 0 */
import React, { useMemo } from 'react';
import styled from 'styled-components';

import Dropdown from './ui/Dropdown';

const Wrapper = styled.div`
  align-items: center;
  display: inline-flex;
  padding: 0 4px;

  > button,
  > div {
    margin: 0 5px;
  }
`;

const DropWrapper = styled(Wrapper)`
  border: 1px solid gray;
  padding: 4px;
`;

const ToolGroupComponent = ({ view, tools, name }) => {
  const toolsShown = [];
  const rest = [];

  tools.forEach(tool => {
    tool.isIntoMoreSection() && tool.isDisplayed()
      ? rest.push(tool.renderTool(view))
      : toolsShown.push(tool.renderTool(view));
  });

  const MemorizedToolGroupComponent = useMemo(
    () => (
      <Wrapper data-name={name}>
        {toolsShown}
        {rest.length > 0 && (
          <Dropdown
            dropComponent={<DropWrapper>{rest}</DropWrapper>}
            iconName="more"
            title="Show more tools"
          />
        )}
      </Wrapper>
    ),
    [],
  );
  return MemorizedToolGroupComponent;
};

export default ToolGroupComponent;

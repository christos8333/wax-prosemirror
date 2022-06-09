import React, { useContext, useMemo, useRef, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { WaxContext } from 'wax-prosemirror-core';
import { v4 as uuidv4 } from 'uuid';
import MenuButton from '../../ui/buttons/MenuButton';

const activeStyles = css`
  pointer-events: none;
`;

const GroupName = styled.div`
  font-size: 14px;
  margin-bottom: 4px;
  text-transform: uppercase;
`;

const OENToolWrapper = styled.div`
  display: flex;
`;

const Box = styled.div`
  background: #bfc4cd;
  border-radius: 4px;
  height: 22px;
  position: relative;
  right: 3px;
  top: 3px;
  width: 22px;
  z-index: 999;
`;

const StyledButton = styled(MenuButton)`
  ${props => props.active && activeStyles}
`;

const OENToolGroup = ({ item }) => {
  console.log(item);
  const {
    app,
    pmViews: { main },
    activeView,
    activeViewId,
  } = useContext(WaxContext);

  const { state } = main;
  const isEditable = main.props.editable(editable => {
    return editable;
  });
  let isDisabled = !item.select(state, activeViewId, activeView);
  if (!isEditable) isDisabled = true;

  const OENToolsConfig = app.config.get('config.OENContainersService');
  console.log(OENToolsConfig);

  return useMemo(
    () => (
      <>
        {OENToolsConfig.map(groupTool => {
          return (
            <div key={uuidv4()}>
              <GroupName key={uuidv4()}>{groupTool.groupHeader} </GroupName>
              {groupTool.items.map(tool => (
                <OENToolWrapper key={uuidv4()}>
                  <Box key={uuidv4()} />
                  <StyledButton
                    active={false}
                    disabled={false}
                    key={uuidv4()}
                    label={tool.displayName}
                    onMouseDown={() => {
                      item.run(
                        activeView.state,
                        activeView.dispatch,
                        tool.className,
                      );
                      setTimeout(() => {
                        main.focus();
                      });
                    }}
                    title={tool.displayName}
                  />
                </OENToolWrapper>
              ))}
            </div>
          );
        })}
      </>
    ),
    [],
  );
};

export default OENToolGroup;

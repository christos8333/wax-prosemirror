import React, { useContext, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { WaxContext } from 'wax-prosemirror-core';
import { wrapIn } from 'prosemirror-commands';
import { v4 as uuidv4 } from 'uuid';
import { liftTarget } from 'prosemirror-transform';
import MenuButton from '../buttons/MenuButton';

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
  margin-bottom: 4px;
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
  border-radius: 4px;
  left: -33px;
  margin-left: 4px;
  padding-left: 25px;
  position: relative;

  ${props => props.active && activeStyles}
`;

const OENToolGroup = ({ item }) => {
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

  const containersActive = item.active(main.state, OENToolsConfig);

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
                    active={containersActive[tool.className] || false}
                    disabled={isDisabled}
                    key={uuidv4()}
                    label={tool.displayName}
                    onMouseDown={() => {
                      const { from, to } = main.state.selection;
                      let isInOenContainer = false;

                      main.state.doc.nodesBetween(from, to, (node, pos) => {
                        if (
                          node.type.name === 'oen_container' ||
                          node.type.name === 'oen_aside'
                        ) {
                          isInOenContainer = true;
                        }
                      });

                      if (isInOenContainer) {
                        const range = main.state.selection.$from.blockRange(
                          main.state.selection.$to,
                        );
                        const target = range && liftTarget(range);
                        if (target == null) return false;
                        main.dispatch(main.state.tr.lift(range, target));
                      }
                      const node = tool.isSection
                        ? 'oen_section'
                        : 'oen_container';

                      wrapIn(main.state.config.schema.nodes[node], {
                        class: tool.className,
                      })(main.state, main.dispatch);

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
    [isDisabled, containersActive],
  );
};

export default OENToolGroup;

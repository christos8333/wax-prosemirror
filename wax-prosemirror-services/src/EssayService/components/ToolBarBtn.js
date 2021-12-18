/* eslint react/prop-types: 0 */
import React, { useContext, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { WaxContext } from 'wax-prosemirror-core';
import { MenuButton } from 'wax-prosemirror-components';
import { findWrapping } from 'prosemirror-transform';
import { Selection } from 'prosemirror-state';

const activeStyles = css`
  pointer-events: none;
`;

const StyledButton = styled(MenuButton)`
  ${props => props.active && activeStyles}
`;

const ToolBarBtn = ({ view = {}, item }) => {
  console.log('hrtr?');
  const { icon, label, select, title } = item;
  const context = useContext(WaxContext);
  console.log(context);
  const {
    view: { main },
    activeView,
  } = useContext(WaxContext);

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const { state } = view;

  let isDisabled = !select(state, activeView);
  if (!isEditable) isDisabled = true;

  const onMouseDown = () => {
    const { $from, $to } = main.state.selection;

    const range = $from.blockRange($to);

    const { tr } = main.state;
    const { dispatch } = main;
    const wrapping1 =
      range &&
      findWrapping(range, main.state.config.schema.nodes.essay, {
        id: uuidv4(),
      });

    tr.wrap(range, wrapping1).scrollIntoView();
    dispatch(tr);
  };

  const onMouseDown2 = () => {
    const { $from, $to } = main.state.selection;

    const range = $from.blockRange($to);

    const { tr } = main.state;
    const { dispatch } = main;
    const wrapping1 =
      range &&
      findWrapping(range, main.state.config.schema.nodes.essay_feedBack, {
        id: uuidv4(),
      });

    tr.wrap(range, wrapping1).scrollIntoView();
    dispatch(tr);
  };

  const ToolBarBtnComponent = useMemo(
    () => (
      <StyledButton
        active={false}
        disabled={isDisabled}
        iconName={icon}
        label={label}
        onMouseDown={e => {
          e.preventDefault();
          //   onMouseDown();
          //   const { tr } = main.state;
          //   const { dispatch } = main;
          //   const map = context.transaction.mapping.maps[0];
          //   let a = 0;
          //   map.forEach((_from, _to, _newFrom, newTo) => {
          //     a = newTo;
          //   });
          //   dispatch(
          //     tr.setSelection(Selection.near(main.state.doc.resolve(a + 1), 0)),
          //   );
          onMouseDown2();
        }}
        title={title}
      />
    ),
    [isDisabled],
  );

  return ToolBarBtnComponent;
};

export default ToolBarBtn;

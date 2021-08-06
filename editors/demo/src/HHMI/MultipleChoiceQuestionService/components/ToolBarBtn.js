/* eslint react/prop-types: 0 */
import React, { useContext, useMemo } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import styled, { css } from 'styled-components';
import { MenuButton } from 'wax-prosemirror-components';
import { Commands } from 'wax-prosemirror-utilities';
import { Fragment } from 'prosemirror-model';
import { TextSelection } from 'prosemirror-state';
import { wrapIn } from 'prosemirror-commands';
import helpers from '../helpers/helpers';

import { v4 as uuidv4 } from 'uuid';
const activeStyles = css`
  pointer-events: none;
`;

const StyledButton = styled(MenuButton)`
  ${props => props.active && activeStyles}
`;

const ToolBarBtn = ({ view = {}, item }) => {
  const { active, icon, label, onlyOnMain, run, select, title } = item;
  const context = useContext(WaxContext);
  const {
    view: { main },
    activeViewId,
    activeView,
  } = useContext(WaxContext);

  if (onlyOnMain) view = main;

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const { state } = view;

  const isActive = !!(
    active(state, activeViewId) && select(state, activeViewId)
  );

  let isDisabled = !select(state, activeViewId, activeView);
  if (!isEditable) isDisabled = true;

  const createOption = () => {
    const { state, dispatch } = main;
    /* Create Wrapping */
    let { $from, $to } = state.selection;
    let range = $from.blockRange($to);

    wrapIn(state.config.schema.nodes.multiple_choice_container)(
      state,
      dispatch,
    );

    /* set New Selection */
    dispatch(
      main.state.tr.setSelection(
        new TextSelection(main.state.tr.doc.resolve(range.$to.pos)),
      ),
    );

    /* create First Option */
    const newAnswerId = uuidv4();
    const answerOption = main.state.config.schema.nodes.multiple_choice.create(
      { id: newAnswerId },
      Fragment.empty,
    );
    dispatch(main.state.tr.replaceSelectionWith(answerOption));
    setTimeout(() => {
      helpers.createEmptyParagraph(context, newAnswerId);
    }, 50);
  };

  const ToolBarBtnComponent = useMemo(
    () => (
      <StyledButton
        active={isActive || false}
        disabled={isDisabled}
        iconName={icon}
        label={label}
        onMouseDown={e => {
          e.preventDefault();
          item.run(view);
          createOption();
        }}
        title={title}
      />
    ),
    [isActive, isDisabled],
  );

  return ToolBarBtnComponent;
};

export default ToolBarBtn;

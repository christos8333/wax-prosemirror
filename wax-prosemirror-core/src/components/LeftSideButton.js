/* eslint react/prop-types: 0 */
import React, { useContext, useMemo } from 'react';
import { isEmpty } from 'lodash';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { WaxContext } from '../WaxContext';
import MenuButton from './ui/MenuButton';

const activeStyles = css`
  pointer-events: none;
`;

const StyledButton = styled(MenuButton)`
  ${props => props.active && activeStyles}
`;

const LeftSideButton = ({ view = {}, item }) => {
  const { t, i18n } = useTranslation();
  const { active, icon, label, run, select, title } = item;

  const {
    pmViews: { main },
    activeViewId,
    activeView,
  } = useContext(WaxContext);

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const { dispatch, state } = view;

  const handleMouseDown = (e, editorState) => {
    e.preventDefault();
    run(editorState, dispatch);
  };

  // const isActive = !!(
  //   active(state, activeViewId) && select(state, activeViewId)
  // );

  const isActive = !!active(state, activeViewId);

  let isDisabled = !select(state, activeViewId, activeView);
  if (!isEditable) isDisabled = true;

  const LeftSideButtonComponent = useMemo(
    () => (
      <StyledButton
        active={isActive || false}
        disabled={isDisabled}
        iconName={icon}
        label={
          !isEmpty(i18n) && i18n.exists(`Wax.BlockLevel.${label}`)
            ? t(`Wax.BlockLevel.${label}`)
            : label
        }
        onMouseDown={e => handleMouseDown(e, view.state, view.dispatch)}
        title={
          !isEmpty(i18n) && i18n.exists(`Wax.BlockLevel.${title}`)
            ? t(`Wax.BlockLevel.${title}`)
            : title
        }
      />
    ),
    [isActive, isDisabled],
  );

  return LeftSideButtonComponent;
};

export default LeftSideButton;

/* eslint react/prop-types: 0 */
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { ButtonStyles } from 'wax-prosemirror-themes';
import { WaxContext } from 'wax-prosemirror-core';
import { Commands } from 'wax-prosemirror-utilities';
import InsertTableTool from '../../ui/tables/InsertTableTool';

const ButtonStyled = styled.button`
  ${ButtonStyles};
  opacity: ${props => (props.select ? 1 : 0.4)};
  pointer-events: ${props => (props.select ? 'default' : 'none')};
  color: ${props => (props.isActive ? 'white' : props.theme.colorButton)};
  background-color: ${props =>
    props.isActive ? props.theme.colorPrimary : 'transparent'};
  &:hover {
    background-color: ${props =>
      props.isActive ? props.theme.colorPrimary : 'transparent'};
  }
`;

const InsertTableToolContainer = styled.div`
  top: 50px;
  position: absolute;
  height: auto;
  width: 167px;
  display: block !important;
`;

const CreateTable = ({ view = {}, item }) => {
  const {
    view: { main },
    activeViewId,
  } = useContext(WaxContext);
  if (item.onlyOnMain) {
    view = main;
  }

  const { state, dispatch } = view;

  const [isTableToolDisplayed, setTableToolDisplay] = useState(false);

  const showHideTable = () => {
    setTableToolDisplay(!isTableToolDisplayed);
  };

  const CreateButton = (
    <ButtonStyled
      type="button"
      isActive={item.active && item.active(view.state)}
      title={item.title}
      disabled={item.enable && !item.enable(view.state)}
      onMouseDown={e => {
        e.preventDefault();
        showHideTable();
      }}
      select={item.select && item.select(view.state, activeViewId)}
    >
      {item.content}
    </ButtonStyled>
  );
  return isTableToolDisplayed ? (
    <>
      {CreateButton}
      <InsertTableToolContainer>
        <InsertTableTool
          onGridSelect={colRows => {
            return Commands.createTable(colRows, state, dispatch);
          }}
        />
      </InsertTableToolContainer>
    </>
  ) : (
    <>{CreateButton}</>
  );
};

export default CreateTable;

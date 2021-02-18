/* eslint react/prop-types: 0 */
import React, { useMemo, useContext } from 'react';
import styled from 'styled-components';
import { WaxContext } from 'wax-prosemirror-core';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Icon from '../../helpers/Icon';

const DropdownStyled = styled(Dropdown)`
  display: inline-flex;
  opacity: ${props => (props.select ? 1 : 0.4)};

  .Dropdown-control {
    border: none;
    cursor: ${props => (props.select ? 'pointer' : 'not-allowed')};
    pointer-events: ${props => (props.select ? 'default' : 'none')};

    &:hover {
      box-shadow: none;
    }
  }

  .Dropdown-arrow {
    right: 25px;
    top: 14px;
  }

  .Dropdown-menu {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    width: 120%;

    .Dropdown-option {
      width: 100%;
    }
  }
`;

const StyledIcon = styled(Icon)`
  height: 16px;
  margin-right: 5px;
  width: 16px;
`;

const Editing = () => {
  return (
    <span>
      <StyledIcon name="editing" />
      Editing
    </span>
  );
};

const Suggesting = () => {
  return (
    <span>
      <StyledIcon name="suggesting" />
      Suggesting
    </span>
  );
};

const Viewing = () => {
  return (
    <span>
      <StyledIcon name="viewing" />
      Viewing
    </span>
  );
};

const dropDownOptions = [
  { label: <Editing />, value: 'editing' },
  { label: <Suggesting />, value: 'suggesting' },
];

const EditingSuggesting = ({ view: { dispatch, state }, item }) => {
  const { app, activeView, view } = useContext(WaxContext);
  const isDisabled = app.config.get('config.EnableTrackChangeService').toggle;

  const isEditable = view.main.props.editable(editable => {
    return editable;
  });

  const enableDisableTrackChanges = () => {
    app.config.get('config.EnableTrackChangeService').enabled = !app.config.get(
      'config.EnableTrackChangeService',
    ).enabled;
    setTimeout(() => {
      activeView.focus();
    }, 100);
  };

  const selectedOption = () => {
    if (app.config.get('config.EnableTrackChangeService').enabled)
      return dropDownOptions[1];

    return dropDownOptions[0];
  };

  const EditingSuggestingComponent = useMemo(
    () => (
      <DropdownStyled
        onChange={option => {
          return enableDisableTrackChanges();
        }}
        options={dropDownOptions}
        select={isDisabled}
        value={selectedOption()}
      />
    ),
    [],
  );

  if (!isEditable) return <Viewing />;

  return EditingSuggestingComponent;
};

export default EditingSuggesting;

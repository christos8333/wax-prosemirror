/* eslint react/prop-types: 0 */
import React, { useMemo, useContext } from 'react';
import styled from 'styled-components';
import { WaxContext } from 'wax-prosemirror-core';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Icon from '../../helpers/Icon';
import TrackChangesBox from '../trackChanges/TrackChangesBox';

const DropdownStyled = styled(Dropdown)`
  cursor: not-allowed;
  display: inline-flex;
  opacity: ${props => (props.select ? 1 : 0.4)};
  pointer-events: ${props => (props.select ? 'default' : 'none')};

  .Dropdown-control {
    border: none;
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
  { label: <Viewing />, value: 'viewing' },
];

const EditingSuggesting = ({ view: { dispatch, state }, item }) => {
  const { activeView, app } = useContext(WaxContext);

  const isDisabled = item.select(activeView.state);

  const enableDisabletrackChanges = () => {
    app.config.get('config.EnableTrackChangeService').enabled = !app.config.get(
      'config.EnableTrackChangeService',
    ).enabled;
  };

  const selectedOption = () => {
    if (app.config.get('config.EnableTrackChangeService').enabled === true)
      return dropDownOptions[1];

    return dropDownOptions[0];
  };

  const EditingSuggestingComponent = useMemo(
    () => (
      <DropdownStyled
        onChange={option => {
          return enableDisabletrackChanges();
        }}
        options={dropDownOptions}
        value={selectedOption()}
        select={isDisabled}
      />
    ),
    [isDisabled],
  );

  return EditingSuggestingComponent;
};

export default EditingSuggesting;

/* eslint react/prop-types: 0 */
import React, { useMemo, useContext } from 'react';
import styled from 'styled-components';
import { WaxContext } from 'wax-prosemirror-core';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Icon from '../../helpers/Icon';

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

console.log(dropDownOptions[0]);

const EditingSuggesting = ({ view: { dispatch, state }, item }) => {
  const { activeView } = useContext(WaxContext);

  const isDisabled = item.select(activeView.state);
  const EditingSuggestingComponent = useMemo(
    () => (
      <DropdownStyled
        onChange={option => {}}
        options={dropDownOptions}
        value={dropDownOptions[0]}
        select={isDisabled}
      />
    ),
    [isDisabled],
  );

  return EditingSuggestingComponent;
};

export default EditingSuggesting;

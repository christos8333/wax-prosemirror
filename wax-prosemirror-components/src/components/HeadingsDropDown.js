/* eslint react/prop-types: 0 */
import React from 'react';
import styled from 'styled-components';
import { Commands } from 'wax-prosemirror-utilities';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const DropdownStyled = styled(Dropdown)`
  display: ${props => (props.select ? 'inline-flex' : 'none')};
  .Dropdown-control {
    border: none;
  }
`;

const dropDownOptions = [
  { label: 'Heading 1', value: '1' },
  { label: 'Heading  2', value: '2' },
  { label: 'Heading 3', value: '3' },
];

const HeadingsDropDown = ({ dispatch, state, item }) => (
  <DropdownStyled
    onChange={option => {
      Commands.setBlockType(state.config.schema.nodes.heading, {
        level: option.value,
      })(state, dispatch);
    }}
    options={dropDownOptions}
    placeholder="Choose heading"
    select={item.select && item.select(state)}
  />
);
export default HeadingsDropDown;

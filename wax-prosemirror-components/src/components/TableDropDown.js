import React from "react";
import styled from "styled-components";
import * as tablesFn from "prosemirror-tables";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const DropdownStyled = styled(Dropdown)`
  display: inline-flex;
  cursor: not-allowed;
  opacity: ${props => (props.select ? 1 : 0.4)};
  pointer-events: ${props => (props.select ? "default" : "none")};
  .Dropdown-control {
    border: none;
  }
  .Dropdown-arrow {
    right: 25px;
    top: 21px;
  }
  .Dropdown-menu {
    width: 120%;
  }
`;

const dropDownOptions = [
  { label: "add column before", value: "addColumnBefore" },
  { label: "add column after", value: "addColumnAfter" },
  { label: "Delete column", value: "deleteColumn" },
  { label: "Insert row before", value: "addRowBefore" },
  { label: "Insert row after", value: "addRowAfter" },
  { label: "Delete row", value: "deleteRow" },
  { label: "Delete table", value: "deleteTable" },
  { label: "Merge cells", value: "mergeCells" },
  { label: "Split cell", value: "splitCell" },
  { label: "Toggle header column", value: "toggleHeaderColumn" },
  { label: "Toggle header row", value: "toggleHeaderRow" },
  { label: "Toggle header cells", value: "toggleHeaderCell" }
];

const TableDropDown = ({ view: { dispatch, state }, item }) => (
  <DropdownStyled
    options={dropDownOptions}
    onChange={option => {
      tablesFn[option.value](state, dispatch);
    }}
    placeholder="Table Options"
    select={item.select && item.select(state)}
  />
);
export default TableDropDown;

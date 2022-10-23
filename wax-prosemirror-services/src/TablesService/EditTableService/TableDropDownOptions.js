/* eslint-disable no-underscore-dangle */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { injectable } from 'inversify';
import { isEmpty } from 'lodash';
import { TableDropDown } from 'wax-prosemirror-components';
import { Commands, Tools } from 'wax-prosemirror-core';

@injectable()
export default class TableDropDownOptions extends Tools {
  title = 'Select Options';
  content = 'table';
  name = 'TableDropDownOptions';

  get run() {
    return (state, dispatch, tableFn) => {
      tableFn(state, dispatch);
    };
  }

  get enable() {
    return state => {
      return Commands.canInsert(state.config.schema.nodes.table)(state);
    };
  }

  select(state) {
    return Commands.isInTable(state);
  }

  renderTool(view) {
    if (isEmpty(view)) return null;
    return this._isDisplayed ? (
      <TableDropDown key={uuidv4()} item={this.toJSON()} view={view} />
    ) : null;
  }
}

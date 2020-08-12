import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { injectable } from 'inversify';
import { isEmpty } from 'lodash';
import { TableDropDown } from 'wax-prosemirror-components';
import { addColumnBefore } from 'prosemirror-tables';
import { Commands } from 'wax-prosemirror-utilities';
import Tools from '../../lib/Tools';

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
    return addColumnBefore(state);
  }

  renderTool(view) {
    if (isEmpty(view)) return null;
    return this._isDisplayed ? (
      <TableDropDown key={uuidv4()} item={this.toJSON()} view={view} />
    ) : null;
  }
}

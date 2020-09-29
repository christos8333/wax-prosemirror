import React from 'react';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { Commands } from 'wax-prosemirror-utilities';
import { injectable } from 'inversify';
import { CreateTable } from 'wax-prosemirror-components';
import Tools from '../../lib/Tools';

export default
@injectable()
class Table extends Tools {
  title = 'Insert table';
  icon = 'table';
  name = 'Table';

  get run() {
    return (colRows, state, dispatch) => {
      Commands.createTable(colRows, state, dispatch);
    };
  }

  select = (state, activeViewId) => {
    if (activeViewId !== 'main') return false;
    return true;
  };

  get enable() {
    return state => {
      return Commands.canInsert(state.config.schema.nodes.table)(state);
    };
  }

  renderTool(view) {
    if (isEmpty(view)) return null;

    return this._isDisplayed ? (
      <CreateTable key={uuidv4()} item={this.toJSON()} view={view} />
    ) : null;
  }
}

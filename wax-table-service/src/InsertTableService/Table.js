import React from 'react';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { injectable } from 'inversify';
import { Commands, Tools } from 'wax-prosemirror-core';
import CreateTable from '../components/CreateTable';

@injectable()
export default class Table extends Tools {
  title = 'Insert table';
  icon = 'table';
  name = 'Table';

  get run() {
    return (colRows, state, dispatch) => {
      Commands.createTable(colRows, state, dispatch);
    };
  }

  select = activeView => {
    const {
      selection: { from },
    } = activeView.state;
    if (from === null) return false;
    const { disallowedTools } = activeView.props;
    if (disallowedTools.includes('Tables')) return false;
    return true;
  };

  get enable() {
    return state => {
      return Commands.canInsert(state.config.schema.nodes.table)(state);
    };
  }

  renderTool(view) {
    if (isEmpty(view)) return null;
    return this.isDisplayed() ? (
      <CreateTable item={this.toJSON()} key={uuidv4()} view={view} />
    ) : null;
  }
}

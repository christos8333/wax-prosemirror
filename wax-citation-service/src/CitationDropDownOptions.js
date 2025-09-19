import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { injectable } from 'inversify';
import { isEmpty } from 'lodash';
import { Commands, Tools } from 'wax-prosemirror-core';
import CitationDropDown from './components/CitationDropDown';

@injectable()
export default class CitationDropDownOptions extends Tools {
  title = 'Select Options';
  content = 'table';
  name = 'CitationDropDownOptions';

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
    return this.isDisplayed() ? (
      <CitationDropDown item={this.toJSON()} key={uuidv4()} view={view} />
    ) : null;
  }
}

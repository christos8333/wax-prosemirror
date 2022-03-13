import React from 'react';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { injectable } from 'inversify';
import { FindAndReplaceTool } from 'wax-prosemirror-components';
import Tools from '../lib/Tools';

@injectable()
export default class FindAndReplace extends Tools {
  title = 'Find And Replace';
  icon = 'findAndReplace';
  name = 'find';

  get run() {
    return (state, dispatch) => {};
  }

  select = (state, activeViewId) => {};

  get enable() {
    return state => {
      return true;
    };
  }

  renderTool(view) {
    if (isEmpty(view)) return null;

    return this._isDisplayed ? (
      <FindAndReplaceTool key={uuidv4()} item={this.toJSON()} view={view} />
    ) : null;
  }
}

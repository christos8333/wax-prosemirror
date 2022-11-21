import React from 'react';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { injectable } from 'inversify';
import { Tools } from 'wax-prosemirror-core';
import FindAndReplaceTool from './components/FindAndReplaceTool';

@injectable()
export default class FindAndReplace extends Tools {
  title = 'Find And Replace';
  icon = 'findAndReplace';
  name = 'find';

  get enable() {
    return () => {
      return true;
    };
  }

  renderTool(view) {
    if (isEmpty(view)) return null;

    return this.isDisplayed() ? (
      <FindAndReplaceTool item={this.toJSON()} key={uuidv4()} view={view} />
    ) : null;
  }
}

import React from 'react';
import { isEmpty } from 'lodash';
import { injectable } from 'inversify';
import { Tools } from 'wax-prosemirror-core';
import EditorInfoTool from './components/EditorInfoTool';

@injectable()
class CounterInfoTool extends Tools {
  title = 'Counter Info';
  name = 'CounterInfo';

  get run() {
    return () => true;
  }

  get enable() {
    return () => {
      return true;
    };
  }

  renderTool(view) {
    if (isEmpty(view)) return null;
    // eslint-disable-next-line no-underscore-dangle
    return this._isDisplayed ? (
      <EditorInfoTool item={this.toJSON()} key="CounterInfo" view={view} />
    ) : null;
  }
}

export default CounterInfoTool;

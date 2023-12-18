import React from 'react';
import { isEmpty } from 'lodash';
import { injectable } from 'inversify';
import { Tools } from 'wax-prosemirror-core';
// import EditorInfoTool from './components/EditorInfoTool';
import CounterTool from './CounterTool';

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
    return this.isDisplayed() ? (
      <CounterTool item={this.toJSON()} key="CounterInfo" view={view} />
    ) : null;
  }
}

export default CounterInfoTool;

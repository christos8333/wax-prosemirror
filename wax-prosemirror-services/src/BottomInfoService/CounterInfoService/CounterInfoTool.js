import React from 'react';
import { isEmpty } from 'lodash';
import { injectable } from 'inversify';
import { EditorInfoTool } from 'wax-prosemirror-components';
import { Tools } from 'wax-prosemirror-core';

@injectable()
class CounterInfoTool extends Tools {
  title = 'Counter Info';
  icon = 'highlight';
  name = 'CounterInfo';

  get run() {
    return () => true;
  }

  get enable() {
    return state => {
      return true;
    };
  }

  renderTool(view) {
    if (isEmpty(view)) return null;
    // eslint-disable-next-line no-underscore-dangle
    return this._isDisplayed ? (
      <EditorInfoTool key="CounterInfo" item={this.toJSON()} view={view} />
    ) : null;
  }
}

export default CounterInfoTool;

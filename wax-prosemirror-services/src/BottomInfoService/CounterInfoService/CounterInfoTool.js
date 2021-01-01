import React from 'react';
import { isEmpty } from 'lodash';
import { injectable } from 'inversify';
import { EditorInfoTool } from 'wax-prosemirror-components';
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import Tools from '../../lib/Tools';


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
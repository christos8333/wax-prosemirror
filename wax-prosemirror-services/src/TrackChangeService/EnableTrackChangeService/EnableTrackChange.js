import React from 'react';
import { injectable } from 'inversify';
import { isEmpty } from 'lodash';
import Tools from '../../lib/Tools';

export default
@injectable()
class EnableTrackChange extends Tools {
  title = 'Select Options';
  content = 'table';

  get run() {
    return () => {
      return true;
    };
  }

  get enable() {
    return state => {
      return true;
    };
  }

  select(state) {
    return true;
  }

  renderTool(view) {
    if (isEmpty(view)) return null;
    return this._isDisplayed ? <button type="button"> Track </button> : null;
  }
}

import React from 'react';
import { isEmpty } from 'lodash';
import { injectable } from 'inversify';
import Tools from '../lib/Tools';

export default
@injectable()
class FullScreenTool extends Tools {
  title = 'full screen';
  icon = 'image';
  name = 'FullScreen';

  get run() {
    return () => true;
  }

  select = (state, activeViewId) => {};

  get enable() {
    return state => {};
  }

  renderTool(view) {
    if (isEmpty(view)) return null;
    return this._isDisplayed ? <span key="1"> full</span> : null;
  }
}

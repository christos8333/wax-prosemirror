import React from 'react';
import { isEmpty } from 'lodash';
import { injectable } from 'inversify';
import { FullScreen } from 'wax-prosemirror-components';
import Tools from '../lib/Tools';

export default
@injectable()
class FullScreenTool extends Tools {
  title = 'full screen';
  icon = 'fullScreen';
  name = 'FullScreen';

  get run() {
    return () => true;
  }

  select = (state, activeViewId) => {
    return true;
  };

  get enable() {
    return state => {
      return true;
    };
  }

  renderTool(view) {
    if (isEmpty(view)) return null;
    return this._isDisplayed ? (
      <FullScreen key="FullScreen" item={this.toJSON()} view={view} />
    ) : null;
  }
}

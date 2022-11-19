import React from 'react';
import { isEmpty } from 'lodash';
import { injectable } from 'inversify';
import { Tools } from 'wax-prosemirror-core';
import FullScreenButton from './components/FullScreenButton';

@injectable()
export default class FullScreenTool extends Tools {
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
    // eslint-disable-next-line no-underscore-dangle
    return this._isDisplayed ? (
      <FullScreenButton item={this.toJSON()} key="FullScreen" view={view} />
    ) : null;
  }
}

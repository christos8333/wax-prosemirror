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

  select = () => {
    return true;
  };

  get enable() {
    return () => {
      return true;
    };
  }

  renderTool(view) {
    if (isEmpty(view)) return null;
    return this.isDisplayed() ? (
      <FullScreenButton item={this.toJSON()} key="FullScreen" view={view} />
    ) : null;
  }
}

import React from 'react';
import { isEmpty } from 'lodash';
import { injectable } from 'inversify';
import Tools from '../lib/Tools';

@injectable()
export default class OENContainersTool extends Tools {
  title = '';
  icon = '';
  name = '';

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
    console.log('hereeee?', this.toJSON());
    // eslint-disable-next-line no-underscore-dangle
    return this._isDisplayed ? (
      <span item={this.toJSON()} view={view}>
        tool
      </span>
    ) : null;
  }
}

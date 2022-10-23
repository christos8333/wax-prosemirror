import React from 'react';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { injectable } from 'inversify';
import { TrackChangeOptionsTool } from 'wax-prosemirror-components';
import { Tools } from 'wax-prosemirror-core';

@injectable()
export default class SpecialCharacters extends Tools {
  title = 'Track Changes Options';
  icon = 'more';
  name = 'trackchangeoptions';

  get run() {
    return (state, dispatch) => {};
  }

  select = (state, activeViewId) => {};

  get enable() {
    return state => {
      return true;
    };
  }

  renderTool(view) {
    if (isEmpty(view)) return null;

    return this._isDisplayed ? (
      <TrackChangeOptionsTool key={uuidv4()} item={this.toJSON()} view={view} />
    ) : null;
  }
}

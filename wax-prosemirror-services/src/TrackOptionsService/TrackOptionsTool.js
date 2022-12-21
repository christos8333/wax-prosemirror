import React from 'react';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { injectable } from 'inversify';
import { Tools } from 'wax-prosemirror-core';
import TrackChangeOptionsTool from './components/TrackChangeOptionsTool';

@injectable()
export default class SpecialCharacters extends Tools {
  title = 'Track Changes Options';
  icon = 'more';
  name = 'trackchangeoptions';

  get enable() {
    return () => {
      return true;
    };
  }

  renderTool(view) {
    if (isEmpty(view)) return null;

    return this.isDisplayed() ? (
      <TrackChangeOptionsTool item={this.toJSON()} key={uuidv4()} view={view} />
    ) : null;
  }
}

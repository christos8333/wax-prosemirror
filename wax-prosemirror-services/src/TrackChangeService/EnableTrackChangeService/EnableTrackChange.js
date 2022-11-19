/* eslint-disable no-unused-vars */
import React from 'react';
import { injectable } from 'inversify';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { Tools } from 'wax-prosemirror-core';
import TrackChangeEnable from '../../CommentsService/components/ui/trackChanges/TrackChangeEnable';

@injectable()
export default class EnableTrackChange extends Tools {
  title = 'Toggle Track Changes';
  label = 'Track Changes';
  name = 'EnableTrackChange';

  get run() {
    return state => {
      this.config.enabled = !this.config.enabled;
      return true;
    };
  }

  get enable() {
    return state => {
      return true;
    };
  }

  renderTool(view) {
    if (isEmpty(view)) return null;
    return this._isDisplayed ? (
      <TrackChangeEnable
        enabled={this.config.enabled}
        item={this.toJSON()}
        key={uuidv4()}
        view={view}
      />
    ) : null;
  }
}

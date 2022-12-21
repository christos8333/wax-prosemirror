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
    return () => {
      this.config.enabled = !this.config.enabled;
      return true;
    };
  }

  get enable() {
    return () => {
      return true;
    };
  }

  renderTool(view) {
    if (isEmpty(view)) return null;
    return this.isDisplayed() ? (
      <TrackChangeEnable
        enabled={this.config.enabled}
        item={this.toJSON()}
        key={uuidv4()}
        view={view}
      />
    ) : null;
  }
}

import React from 'react';
import { injectable } from 'inversify';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { TrackChangeEnable } from 'wax-prosemirror-components';
import Tools from '../../lib/Tools';

export default
@injectable()
class EnableTrackChange extends Tools {
  title = 'Toggle Track Changes';
  content = 'track changes';

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
        key={uuidv4()}
        view={view}
        item={this.toJSON()}
        enabled={this.config.enabled}
      />
    ) : null;
  }
}

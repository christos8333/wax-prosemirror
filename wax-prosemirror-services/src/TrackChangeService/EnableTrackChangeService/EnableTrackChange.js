import React from 'react';
import { injectable } from 'inversify';
import { isEmpty } from 'lodash';
import Tools from '../../lib/Tools';

export default
@injectable()
class EnableTrackChange extends Tools {
  title = 'Toggle Track Changes';
  content = 'track changes';

  get run() {
    return state => {
      console.log(this.config);
      return true;
    };
  }

  get enable() {
    return state => {
      return true;
    };
  }

  select(state) {
    return true;
  }

  renderTool(view) {
    if (isEmpty(view)) return null;
    return this._isDisplayed ? (
      <button
        type="button"
        onMouseDown={e => {
          e.preventDefault();
          this.run(view.state, view.dispatch);
        }}
      >
        {' '}
        Track{' '}
      </button>
    ) : null;
  }
}

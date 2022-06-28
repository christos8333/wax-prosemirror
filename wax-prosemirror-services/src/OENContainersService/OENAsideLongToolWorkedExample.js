import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { isEmpty } from 'lodash';
import { injectable } from 'inversify';
import { OENAsideButton } from 'wax-prosemirror-components';
import Tools from '../lib/Tools';

@injectable()
export default class OENAsideLongToolWorkedExample extends Tools {
  title = 'long';
  label = 'Worked Example';
  name = 'OENAsideLongToolWorkedExample';

  get run() {
    return (state, dispatch, className) => {};
  }

  select = (state, activeViewId) => {
    if (activeViewId !== 'main') return false;
    return true;
  };

  get enable() {
    return state => {
      return true;
    };
  }

  get active() {
    return (state, OENToolsConfig) => {};
  }

  renderTool(view) {
    if (isEmpty(view)) return null;

    return (
      <OENAsideButton
        item={this.toJSON()}
        key={uuidv4()}
        type="long worked-example"
        view={view}
      />
    );
  }
}

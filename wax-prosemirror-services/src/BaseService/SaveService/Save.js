import React from 'react';
import { isEmpty } from 'lodash';
import { injectable } from 'inversify';
import { SaveButton, icons } from 'wax-prosemirror-components';
import Tools from '../../lib/Tools';

@injectable()
export default class Save extends Tools {
  title = 'Save changes';
  icon = 'save';
  name = 'Save';
  content = icons.save;
  name = 'Save';

  get run() {
    return (state, dispatch) => {
      return true;
    };
  }

  renderTool(view) {
    if (isEmpty(view)) return null;
    // eslint-disable-next-line no-underscore-dangle
    return this._isDisplayed ? (
      <SaveButton item={this.toJSON()} key="Save" view={view} />
    ) : null;
  }
}

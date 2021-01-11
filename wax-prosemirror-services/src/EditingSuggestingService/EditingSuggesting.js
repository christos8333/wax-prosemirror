import React from 'react';
import { injectable } from 'inversify';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { EditingSuggestingDropDown } from 'wax-prosemirror-components';
import Tools from '../lib/Tools';

export default
@injectable()
class EditingSuggesting extends Tools {
  title = '';
  label = '';
  name = 'EditingSuggesting';

  get run() {
    return state => {
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
      <EditingSuggestingDropDown
        key={uuidv4()}
        view={view}
        item={this.toJSON()}
        enabled={this.config.enabled}
      />
    ) : null;
  }
}

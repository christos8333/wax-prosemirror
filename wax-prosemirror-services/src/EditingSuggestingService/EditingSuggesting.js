/* eslint-disable no-unused-vars */
import React from 'react';
import { injectable } from 'inversify';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { Tools } from 'wax-prosemirror-core';
import EditingSuggestingDropDown from './components/EditingSuggestingDropDown';

@injectable()
export default class EditingSuggesting extends Tools {
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
    // eslint-disable-next-line no-underscore-dangle
    return this._isDisplayed ? (
      <EditingSuggestingDropDown
        enabled={this.config.enabled}
        item={this.toJSON()}
        key={uuidv4()}
        view={view}
      />
    ) : null;
  }
}

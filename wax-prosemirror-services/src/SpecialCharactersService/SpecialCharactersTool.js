import React from 'react';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { injectable } from 'inversify';
import { SpecialCharactersTool } from 'wax-prosemirror-components';
import Tools from '../lib/Tools';

@injectable()
export default class SpecialCharacters extends Tools {
  title = 'Special Characters';
  icon = 'specialCharacters';
  name = 'specialCharacters';

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
      <SpecialCharactersTool key={uuidv4()} item={this.toJSON()} view={view} />
    ) : null;
  }
}

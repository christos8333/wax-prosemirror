import React from 'react';
import { isEmpty } from 'lodash';
import { injectable } from 'inversify';
import { Tools, icons } from 'wax-prosemirror-core';
import SaveButton from './components/SaveButton';

@injectable()
export default class Save extends Tools {
  title = 'Save changes';
  icon = 'save';
  name = 'Save';
  content = icons.save;
  name = 'Save';

  renderTool(view) {
    if (isEmpty(view)) return null;
    return this.isDisplayed() ? (
      <SaveButton item={this.toJSON()} key="Save" view={view} />
    ) : null;
  }
}

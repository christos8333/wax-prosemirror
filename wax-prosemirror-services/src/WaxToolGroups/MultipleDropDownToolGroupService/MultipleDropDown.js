import React from 'react';
import { injectable, inject } from 'inversify';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import ToolGroup from '../../lib/ToolGroup';
import DropDownComponent from './DropDownComponent';

@injectable()
class MultipleDropDown extends ToolGroup {
  tools = [];
  constructor() {
    super();
    this.tools = [];
  }

  renderTools(view) {
    if (isEmpty(view)) return null;
    return (
      // eslint-disable-next-line no-underscore-dangle
      <DropDownComponent key={uuidv4()} tools={this._tools} view={view} />
    );
  }
}

export default MultipleDropDown;

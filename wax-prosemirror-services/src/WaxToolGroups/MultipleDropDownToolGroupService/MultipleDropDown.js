import React from 'react';
import { injectable, inject } from 'inversify';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import ToolGroup from '../../lib/ToolGroup';
import DropComponent from './DropComponent';

@injectable()
class MultipleDropDown extends ToolGroup {
  tools = [];
  constructor(
    @inject('MultipleChoiceQuestion') multipleChoiceQuestion,
    @inject('MultipleChoiceSingleCorrectQuestion')
    multipleChoiceSingleCorrectQuestion,
    @inject('TrueFalseQuestion') trueFalseQuestion,
    @inject('TrueFalseSingleCorrectQuestion') trueFalseSingleCorrectQuestion,
  ) {
    super();
    this.tools = [
      multipleChoiceQuestion,
      multipleChoiceSingleCorrectQuestion,
      trueFalseQuestion,
      trueFalseSingleCorrectQuestion,
    ];
  }

  renderTools(view) {
    if (isEmpty(view)) return null;
    return (
      // eslint-disable-next-line no-underscore-dangle
      <DropComponent key="Multipe Drop Down" tools={this._tools} view={view} />
    );
  }
}

export default MultipleDropDown;

import React, { useMemo } from 'react';
import { injectable, inject } from 'inversify';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { ToolGroup } from 'wax-prosemirror-core';
import DropDownComponent from './DropDownComponent';

@injectable()
class QuestionsDropDown extends ToolGroup {
  tools = [];
  constructor(
    @inject('MultipleChoiceQuestion') multipleChoiceQuestion,
    @inject('MultipleChoiceSingleCorrectQuestion')
    multipleChoiceSingleCorrectQuestion,
    @inject('TrueFalseQuestion') trueFalseQuestion,
    @inject('TrueFalseSingleCorrectQuestion') trueFalseSingleCorrectQuestion,
    @inject('MatchingQuestion') matchingQuestion,
    @inject('EssayQuestion') essayQuestion,
  ) {
    super();
    this.tools = [
      multipleChoiceQuestion,
      multipleChoiceSingleCorrectQuestion,
      trueFalseQuestion,
      trueFalseSingleCorrectQuestion,
      matchingQuestion,
      essayQuestion,
    ];
  }

  renderTools(view) {
    if (isEmpty(view)) return null;
    const MultipleDropDown = useMemo(
      () => (
        <DropDownComponent key={uuidv4()} tools={this._tools} view={view} />
      ),
      [],
    );
    return MultipleDropDown;
  }
}

export default QuestionsDropDown;

import { injectable, inject } from 'inversify';
import { ToolGroup } from 'wax-prosemirror-core';

@injectable()
class NumericalAnswer extends ToolGroup {
  tools = [];
  constructor(@inject('NumericalAnswerDropDown') NumericalAnswerDropDown) {
    super();
    this.tools = [NumericalAnswerDropDown];
  }
}

export default NumericalAnswer;

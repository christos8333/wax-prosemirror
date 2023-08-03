import { injectable, inject } from 'inversify';
import { ToolGroup } from 'wax-prosemirror-core';

@injectable()
class MultipleDropDown extends ToolGroup {
  tools = [];
  constructor(@inject('CreateDropDown') CreateDropDown) {
    super();
    this.tools = [CreateDropDown];
  }
}

export default MultipleDropDown;

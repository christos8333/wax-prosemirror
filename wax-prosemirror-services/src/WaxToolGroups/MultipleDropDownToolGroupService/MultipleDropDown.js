import { injectable, inject } from 'inversify';
import ToolGroup from '../../lib/ToolGroup';

@injectable()
class MultipleDropDown extends ToolGroup {
  tools = [];
  constructor(
    @inject('MultipleDropDownQuestion') MultipleDropDownQuestion,
    @inject('CreateDropDown') CreateDropDown,
  ) {
    super();
    this.tools = [MultipleDropDownQuestion, CreateDropDown];
  }
}

export default MultipleDropDown;

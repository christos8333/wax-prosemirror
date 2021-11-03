import { injectable, inject } from 'inversify';
import ToolGroup from '../../lib/ToolGroup';

@injectable()
class MultipleDropDown extends ToolGroup {
  tools = [];
  constructor() {
    super();
    this.tools = [];
  }
}

export default MultipleDropDown;

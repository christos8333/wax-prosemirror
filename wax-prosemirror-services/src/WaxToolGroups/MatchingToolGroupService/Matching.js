import { injectable, inject } from 'inversify';
import ToolGroup from '../../lib/ToolGroup';

@injectable()
class Matching extends ToolGroup {
  tools = [];
  constructor() {
    super();
    this.tools = [];
  }
}

export default Matching;

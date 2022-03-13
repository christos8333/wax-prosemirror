import { injectable, inject } from 'inversify';
import ToolGroup from '../../lib/ToolGroup';

@injectable()
class Notes extends ToolGroup {
  tools = [];
  constructor(@inject('Note') note) {
    super();
    this.tools = [note];
  }
}

export default Notes;

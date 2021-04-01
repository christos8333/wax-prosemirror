import { injectable, inject } from 'inversify';
import { ToolGroup } from 'wax-prosemirror-services';

@injectable()
class Questions extends ToolGroup {
  tools = [];
  constructor(@inject('Note') note) {
    super();
    this.tools = [note];
  }
}

export default Questions;

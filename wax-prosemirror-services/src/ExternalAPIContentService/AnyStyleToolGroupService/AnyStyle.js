import { injectable, inject } from 'inversify';
import { ToolGroup } from 'wax-prosemirror-core';

@injectable()
class Anystyle extends ToolGroup {
  tools = [];
  constructor(@inject('ExternalAPIContentTool') ExternalAPIContentTool) {
    super();
    this.tools = [ExternalAPIContentTool];
  }
}

export default Anystyle;

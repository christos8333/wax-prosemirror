import { injectable, inject } from 'inversify';
import { ToolGroup } from 'wax-prosemirror-core';

@injectable()
class Citation extends ToolGroup {
  tools = [];
  constructor(@inject('CitationDropDownOptions') citationDropDownOptions) {
    super();
    this.tools = [citationDropDownOptions];
  }
}

export default Citation;

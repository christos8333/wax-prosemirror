import { injectable, inject } from 'inversify';
import { ToolGroup } from 'wax-prosemirror-core';

@injectable()
class Images extends ToolGroup {
  tools = [];
  constructor(@inject('Image') image) {
    super();
    this.tools = [image];
  }
}

export default Images;

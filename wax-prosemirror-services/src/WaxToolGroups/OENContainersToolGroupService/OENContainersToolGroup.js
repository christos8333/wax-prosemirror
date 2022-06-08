import React from 'react';
import { injectable, inject } from 'inversify';
import { LeftMenuTitle } from 'wax-prosemirror-components';
import ToolGroup from '../../lib/ToolGroup';

@injectable()
class Display extends ToolGroup {
  tools = [];
  title = (<LeftMenuTitle title="Display" />);

  constructor(@inject('OENContainersTool') OENContainersTool) {
    super();
    this.tools = [OENContainersTool];
  }
}

export default Display;

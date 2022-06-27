import React from 'react';
import { injectable, inject } from 'inversify';
import { LeftMenuTitle } from 'wax-prosemirror-components';
import ToolGroup from '../../lib/ToolGroup';

@injectable()
class OENAsideShortToolGroup extends ToolGroup {
  tools = [];
  title = (<LeftMenuTitle title="Short Boxes" />);

  constructor(@inject('OENAsideTool') OENAsideTool) {
    super();
    this.tools = [OENAsideTool];
  }
}

export default OENAsideShortToolGroup;

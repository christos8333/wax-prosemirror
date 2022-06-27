import React from 'react';
import { injectable, inject } from 'inversify';
import { LeftMenuTitle } from 'wax-prosemirror-components';
import ToolGroup from '../../lib/ToolGroup';

@injectable()
class OENAsideLongToolGroup extends ToolGroup {
  tools = [];
  title = (<LeftMenuTitle title="Long Boxes" />);

  constructor(@inject('OENAsideTool') OENAsideTool) {
    super();
    this.tools = [OENAsideTool];
  }
}

export default OENAsideLongToolGroup;

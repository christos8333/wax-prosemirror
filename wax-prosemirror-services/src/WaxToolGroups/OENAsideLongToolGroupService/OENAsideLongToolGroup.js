import React from 'react';
import { injectable, inject } from 'inversify';
import { LeftMenuTitle } from 'wax-prosemirror-components';
import ToolGroup from '../../lib/ToolGroup';

@injectable()
class OENAsideLongToolGroup extends ToolGroup {
  tools = [];
  title = (<LeftMenuTitle title="Long Boxes" />);

  constructor(@inject('OENAsideLongTool') OENAsideLongTool) {
    super();
    this.tools = [OENAsideLongTool];
  }
}

export default OENAsideLongToolGroup;

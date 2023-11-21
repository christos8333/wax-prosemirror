import React from 'react';
import { injectable, inject } from 'inversify';
import { ToolGroup, LeftMenuTitle } from 'wax-prosemirror-core';

@injectable()
class OENAsideShortToolGroup extends ToolGroup {
  tools = [];
  title = (<LeftMenuTitle title="Short Boxes" />);

  constructor(
    @inject('OENAsideShortToolNote') OENAsideShortToolNote,
    @inject('OENAsideShortToolTip') OENAsideShortToolTip,
    @inject('OENAsideShortToolWarning') OENAsideShortToolWarning,
    @inject('OENAsideShortToolReminder') OENAsideShortToolReminder,
  ) {
    super();
    this.tools = [
      OENAsideShortToolNote,
      OENAsideShortToolTip,
      OENAsideShortToolWarning,
      OENAsideShortToolReminder,
    ];
  }
}

export default OENAsideShortToolGroup;

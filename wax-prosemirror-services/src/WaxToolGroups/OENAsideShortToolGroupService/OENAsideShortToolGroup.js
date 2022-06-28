import React from 'react';
import { injectable, inject } from 'inversify';
import { LeftMenuTitle } from 'wax-prosemirror-components';
import ToolGroup from '../../lib/ToolGroup';

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

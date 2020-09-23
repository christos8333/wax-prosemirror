import React from 'react';
import { injectable, inject } from 'inversify';
import { LeftMenuTitle } from 'wax-prosemirror-components';
import ToolGroup from '../../lib/ToolGroup';

@injectable()
class DisplayText extends ToolGroup {
  tools = [];
  toolGroups = [];

  constructor(@inject('Display') display, @inject('Text') text) {
    super();
    this.toolGroups = [display, text];
  }

  renderTools(view) {
    return <span>hi</span>;
  }
}

export default DisplayText;

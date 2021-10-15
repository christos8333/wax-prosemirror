import React from 'react';
import { injectable, inject } from 'inversify';
import { LeftMenuTitle } from 'wax-prosemirror-components';
import ToolGroup from '../../lib/ToolGroup';

@injectable()
class Display extends ToolGroup {
  tools = [];
  title = (<LeftMenuTitle title="Display" />);

  constructor(
    @inject('Author') author,
    @inject('Title') title,
    @inject('SubTitle') subtitle,
    @inject('EpigraphProse') epigraphprose,
    @inject('EpigraphPoetry') epigraphpoetry,
    @inject('Heading2') heading2,
    @inject('Heading3') heading3,
    @inject('Heading4') heading4,
    @inject('Heading5') heading5,
    @inject('Heading6') heading6,
  ) {
    super();
    this.tools = [
      title,
      author,
      subtitle,
      epigraphprose,
      epigraphpoetry,
      heading2,
      heading3,
      heading4,
      heading5,
      heading6,
    ];
  }
}

export default Display;

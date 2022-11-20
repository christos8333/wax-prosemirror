import React from 'react';
import { injectable, inject } from 'inversify';
import { ToolGroup, LeftMenuTitle } from 'wax-prosemirror-core';

@injectable()
class OENAsideLongToolGroup extends ToolGroup {
  tools = [];
  title = (<LeftMenuTitle title="Long Boxes" />);

  constructor(
    @inject('OENAsideLongToolCaseStudy') OENAsideLongToolCaseStudy,
    @inject('OENAsideLongToolBiography') OENAsideLongToolBiography,
    @inject('OENAsideLongToolWorkedExample') OENAsideLongToolWorkedExample,
  ) {
    super();
    this.tools = [
      OENAsideLongToolCaseStudy,
      OENAsideLongToolBiography,
      OENAsideLongToolWorkedExample,
    ];
  }
}

export default OENAsideLongToolGroup;

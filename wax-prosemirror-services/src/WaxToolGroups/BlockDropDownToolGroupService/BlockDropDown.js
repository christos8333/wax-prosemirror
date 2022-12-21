import React, { useMemo } from 'react';
import { injectable, inject } from 'inversify';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { ToolGroup } from 'wax-prosemirror-core';
import BlockDropDownComponent from './BlockDropDownComponent';

@injectable()
class BlockDropDown extends ToolGroup {
  tools = [];

  constructor(
    @inject('Title') title,
    @inject('Author') author,
    @inject('SubTitle') subtitle,
    @inject('EpigraphProse') epigraphprose,
    @inject('EpigraphPoetry') epigraphpoetry,
    @inject('Heading2') heading2,
    @inject('Heading3') heading3,
    @inject('Heading4') heading4,
    @inject('Paragraph') paragraph,
    @inject('ParagraphContinued') paragraphContinued,
    @inject('ExtractProse') extractProse,
    @inject('ExtractPoetry') extractPoetry,
    @inject('SourceNote') sourceNote,
    @inject('BlockQuote') blockQuote,
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
      paragraph,
      paragraphContinued,
      extractProse,
      extractPoetry,
      sourceNote,
      blockQuote,
    ];
  }

  renderTools(view) {
    if (isEmpty(view)) return null;
    const MultipleDropDown = useMemo(
      () => (
        <BlockDropDownComponent
          key={uuidv4()}
          tools={this._tools}
          view={view}
        />
      ),
      [],
    );
    return MultipleDropDown;
  }
}

export default BlockDropDown;

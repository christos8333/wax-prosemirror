import React, { useMemo } from 'react';
import { injectable, inject } from 'inversify';
import { ToolGroupComponent } from 'wax-prosemirror-components';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { ToolGroup } from 'wax-prosemirror-core';

@injectable()
class Annotations extends ToolGroup {
  tools = [];
  constructor(
    @inject('Code') code,
    @inject('Emphasis') emphasis,
    @inject('Link') link,
    @inject('StrikeThrough') strikethrough,
    @inject('Strong') strong,
    @inject('Subscript') subscript,
    @inject('Superscript') superscript,
    @inject('Underline') underline,
    @inject('SmallCaps') smallcaps,
  ) {
    super();
    this.tools = [
      strong,
      emphasis,
      code,
      link,
      strikethrough,
      underline,
      subscript,
      superscript,
      smallcaps,
    ];
  }

  renderTools(view) {
    if (isEmpty(view)) return null;

    const { name } = this.constructor;

    const MemorizedToolGroupComponent = useMemo(
      () => (
        <ToolGroupComponent
          key={uuidv4()}
          view={view}
          tools={this._tools}
          title={this.title}
          name={name}
        />
      ),
      [view],
    );

    return MemorizedToolGroupComponent;
  }
}

export default Annotations;

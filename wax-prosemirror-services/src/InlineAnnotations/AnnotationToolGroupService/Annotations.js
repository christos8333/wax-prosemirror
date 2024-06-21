import React, { useMemo } from 'react';
import { injectable, inject } from 'inversify';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { ToolGroup, ToolGroupComponent } from 'wax-prosemirror-core';

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

  renderTools(state) {
    if (isEmpty(state)) return null;

    const { name } = this.constructor;

    const MemorizedToolGroupComponent = useMemo(
      () => (
        <ToolGroupComponent
          key={uuidv4()}
          state={state}
          tools={this._tools}
          title={this.title}
          name={name}
        />
      ),
      [state],
    );

    return MemorizedToolGroupComponent;
  }
}

export default Annotations;

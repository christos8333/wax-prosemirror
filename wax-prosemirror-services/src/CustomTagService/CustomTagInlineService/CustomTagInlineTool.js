import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CustomTagInlineComponent } from 'wax-prosemirror-components';
import Tools from '../../lib/Tools';

class CustomTagInLineTool extends Tools {
  title = 'Custom Tag Inline';
  icon = 'cutomInline';
  name = 'CustomTagInline';

  renderTool(view) {
    return (
      <CustomTagInlineComponent
        item={this.toJSON()}
        key={uuidv4()}
        view={view}
      />
    );
  }
}

export default CustomTagInLineTool;

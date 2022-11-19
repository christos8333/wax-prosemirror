import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Tools } from 'wax-prosemirror-core';
import CustomTagInlineComponent from '../components/CustomTagInlineComponent';

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

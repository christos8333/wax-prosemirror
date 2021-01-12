import React from 'react';
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import Tools from '../../lib/Tools';
import { v4 as uuidv4 } from 'uuid';
import CustomTagInlineComponent from '../../../../wax-prosemirror-components/src/components/customtag/CustomTagInlineComponent'

class CustomTagInLineTool extends Tools {
  title = 'Custom Tag Inline';
  icon = 'cutomInline';
  name = 'CustomTagInline';

  renderTool(view) {
    return (
      <CustomTagInlineComponent item={this.toJSON()} key={uuidv4()} view={view} />
    );
  }
}

export default CustomTagInLineTool;

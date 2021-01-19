import React from 'react';
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import Tools from '../../lib/Tools';
import { v4 as uuidv4 } from 'uuid';
import { CustomTagBlockComponent } from 'wax-prosemirror-components';

class CustomTagBlockTool extends Tools {
  title = 'Custom Tag Block';
  name = 'CustomTagBlock';

  renderTool(view) {
    return (
      <CustomTagBlockComponent item={this.toJSON()} key={uuidv4()} view={view} />
    );
  }
}

export default CustomTagBlockTool;

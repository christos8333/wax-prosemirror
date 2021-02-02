import React from 'react';
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import Tools from '../../lib/Tools';

class CustomTagBlockTool extends Tools {
  title = 'Custom Tag Block';
  name = 'CustomTagBlock';

  get active() {
    return state => {
      return Commands.blockActive(state.config.schema.nodes.customTagBlock)(
        state,
      );
    };
  }
}

export default CustomTagBlockTool;

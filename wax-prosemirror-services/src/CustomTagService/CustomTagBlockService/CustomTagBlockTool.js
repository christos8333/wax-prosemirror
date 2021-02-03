import React from 'react';
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import Tools from '../../lib/Tools';
import { Commands } from 'wax-prosemirror-utilities';

class CustomTagBlockTool extends Tools {
  title = 'Custom Tag Block';
  name = 'CustomTagBlock';

  get run() {
    return (state, dispatch, val) => {
      Commands.setBlockType(state.config.schema.nodes.customTagBlock, {
        class: 'custom-tag-block ' + val
      })(state, dispatch);
    };
  }

  get active() {
    return state => {
      return  Commands.blockActive(state.config.schema.nodes.customTagBlock)(state);
    };
  }
}

export default CustomTagBlockTool;

import { injectable } from 'inversify';
import { icons } from 'wax-prosemirror-components';
import { Commands } from 'wax-prosemirror-utilities';
import Tools from '../lib/Tools';

@injectable()
class CodeBlockTool extends Tools {
  title = 'Insert Code Block';
  content = icons.code_block;

  get run() {
    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.code_block)(
        state,
        dispatch,
      );
    };
  }

  get enable() {
    return state => {
      return Commands.setBlockType(state.config.schema.nodes.code_block)(state);
    };
  }
}

export default CodeBlockTool;

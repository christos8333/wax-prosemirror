import { injectable } from 'inversify';
import { setBlockType } from 'prosemirror-commands';
import Tools from '../lib/Tools';

@injectable()
class CodeBlockTool extends Tools {
  title = 'Insert Code Block';
  icon = 'codeBlock';
  name = 'CodeBlockTool';

  get run() {
    return (state, dispatch) => {
      setBlockType(state.config.schema.nodes.code_block)(state, dispatch);
    };
  }

  select = (state, activeViewId) => {
    if (activeViewId !== 'main') return false;
    return true;
  };

  get enable() {
    return state => {
      return setBlockType(state.config.schema.nodes.code_block)(state);
    };
  }
}

export default CodeBlockTool;

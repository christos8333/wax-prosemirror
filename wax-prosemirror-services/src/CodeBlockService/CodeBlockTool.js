import { injectable } from 'inversify';
import { setBlockType } from 'prosemirror-commands';
import { Tools } from 'wax-prosemirror-core';

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

  select = (state, activeViewId, activeView) => {
    const { disallowedTools } = activeView.props;
    if (disallowedTools.includes('CodeBlock')) return false;
    return true;
  };

  get enable() {
    return state => {
      return setBlockType(state.config.schema.nodes.code_block)(state);
    };
  }
}

export default CodeBlockTool;

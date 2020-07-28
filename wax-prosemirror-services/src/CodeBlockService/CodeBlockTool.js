import Tools from '../lib/Tools';
import { injectable } from 'inversify';
import { icons } from 'wax-prosemirror-components';
import { wrapIn } from 'prosemirror-commands';

@injectable()
class CodeBlockTool extends Tools {
  title = 'Insert Code Block';
  content = icons.footnote;

  get run() {
    return (state, dispatch) => {
      wrapIn(state.config.schema.nodes.codeblock)(state, dispatch);
    };
  }

  get enable() {}
}

export default CodeBlockTool;

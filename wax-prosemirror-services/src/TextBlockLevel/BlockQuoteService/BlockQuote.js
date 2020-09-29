import Tools from '../../lib/Tools';
import { injectable } from 'inversify';
import { wrapIn } from 'prosemirror-commands';

@injectable()
class BlockQuote extends Tools {
  title = 'Change to Block Quote';
  label = 'Block Quote';
  name = 'BlockQuote';

  get run() {
    return (state, dispatch) => {
      wrapIn(state.config.schema.nodes.blockquote)(state, dispatch);
    };
  }

  select = (state, activeViewId) => {
    if (activeViewId !== 'main') return false;
    return true;
  };

  get enable() {
    return state => {
      return wrapIn(state.config.schema.nodes.blockquote)(state);
    };
  }
}
export default BlockQuote;

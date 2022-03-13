import { joinUp } from 'prosemirror-commands';
import { injectable } from 'inversify';
import Tools from '../../lib/Tools';

@injectable()
export default class JoinUp extends Tools {
  title = 'Join with above block';
  icon = 'arrowUp';
  name = 'JoinUp';

  get run() {
    return joinUp;
  }

  select = (state, activeViewId, activeView) => {
    const {
      selection: { from, to },
    } = state;
    let status = joinUp(state);

    if ('subList' in this.config && !this.config.subList) {
      state.doc.nodesBetween(from, to, node => {
        if (node.type.name === 'list_item') status = false;
      });
    }

    if (from === null) return false;
    const { disallowedTools } = activeView.props;
    if (disallowedTools.includes('Lists')) status = false;
    return status;
  };

  get enable() {
    return joinUp;
  }

  get active() {
    return state => {
      return false;
    };
  }
}

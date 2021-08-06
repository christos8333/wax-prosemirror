import { injectable } from 'inversify';
import { icons } from 'wax-prosemirror-components';
import { wrapInList } from 'prosemirror-schema-list';
import { Commands } from 'wax-prosemirror-utilities';
import Tools from '../../lib/Tools';

export default
@injectable()
class BulletList extends Tools {
  title = 'Wrap in bullet list';
  content = icons.bullet_list;
  icon = 'bulletList';
  name = 'BulletList';

  get run() {
    return (state, dispatch) => {
      return wrapInList(state.config.schema.nodes.bulletlist)(state, dispatch);
    };
  }

  get enable() {
    return state => {
      return wrapInList(state.config.schema.nodes.bulletlist)(state);
    };
  }

  select = (state, activeViewId, activeView) => {
    const { disallowedTools } = activeView.props;
    if (disallowedTools.includes('lists')) return false;
    return true;
  };

  get active() {
    return state => {
      return Commands.blockActive(state.config.schema.nodes.bulletlist)(state);
    };
  }
}

import { injectable } from 'inversify';
import { wrapInList } from 'prosemirror-schema-list';
import { Commands, Tools, icons } from 'wax-prosemirror-core';

@injectable()
export default class BulletList extends Tools {
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
    const {
      selection: { from, to },
    } = state;
    let status = true;

    if (!wrapInList(state.config.schema.nodes.bulletlist)(activeView.state))
      status = false;

    if ('subList' in this.config && !this.config.subList) {
      state.doc.nodesBetween(from, to, node => {
        if (node.type.name === 'list_item') status = false;
      });
    }

    if (from === null) return false;
    const { disallowedTools } = activeView.props;
    if (disallowedTools.includes('Lists')) status = false;

    // Disable lists first in questions
    if (
      activeViewId !== 'main' &&
      activeView.state.selection.$from.start(1) === 1
    ) {
      status = false;
    }

    return status;
  };

  get active() {
    return state => {
      return Commands.blockActive(state.config.schema.nodes.bulletlist)(state);
    };
  }
}

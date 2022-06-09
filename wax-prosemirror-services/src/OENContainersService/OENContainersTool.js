import { injectable } from 'inversify';
import { wrapIn } from 'prosemirror-commands';
import { Commands } from 'wax-prosemirror-utilities';
import Tools from '../lib/Tools';

@injectable()
export default class OENContainersTool extends Tools {
  title = '';
  icon = '';
  name = 'OENContainersTool';

  get run() {
    return (state, dispatch, className) => {
      console.log(state.selection);
      const node = className === 'section' ? 'oen_section' : 'oen_container';

      wrapIn(state.config.schema.nodes[node], { class: className })(
        state,
        dispatch,
      );

      console.log(className);
    };
  }

  select = (state, activeViewId) => {
    const { from, to } = state.selection;
    let status = true;
    state.doc.nodesBetween(from, to, (node, pos) => {
      if (node.type.name === 'oen_container') {
        status = false;
      }
    });
    return status;
  };

  get enable() {
    return state => {
      return true;
    };
  }

  get active() {
    return (state, OENToolsConfig) => {
      const { from, to } = state.selection;
      const a = {};
      state.doc.nodesBetween(from, to, (node, pos) => {
        if (
          node.type.name === 'oen_container' ||
          node.type.name === 'oen_section'
        ) {
          OENToolsConfig.forEach(groupTool => {
            groupTool.items.forEach(tool => {
              if (tool.className === node.attrs.class) {
                a[tool.className] = true;
              }
            });
          });
        }
      });
      return a;
    };
  }
}

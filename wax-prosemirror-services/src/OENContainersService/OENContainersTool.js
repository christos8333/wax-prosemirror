import { injectable } from 'inversify';
import { wrapIn } from 'prosemirror-commands';
import { liftTarget, findWrapping } from 'prosemirror-transform';
import Tools from '../lib/Tools';

@injectable()
export default class OENContainersTool extends Tools {
  title = '';
  icon = '';
  name = 'OENContainersTool';

  get run() {
    return (state, dispatch, className) => {};
  }

  select = (state, activeViewId) => {
    if (activeViewId !== 'main') return false;
    return true;
  };

  get enable() {
    return state => {
      return true;
    };
  }

  get active() {
    return (state, OENToolsConfig) => {
      const { from, to } = state.selection;
      const tools = {};
      state.doc.nodesBetween(from, to, (node, pos) => {
        if (
          node.type.name === 'oen_container' ||
          node.type.name === 'oen_section'
        ) {
          OENToolsConfig.forEach(groupTool => {
            groupTool.items.forEach(tool => {
              if (tool.className === node.attrs.class) {
                tools[tool.className] = true;
              }
            });
          });
        }
      });
      return tools;
    };
  }
}

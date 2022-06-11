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
    return (state, dispatch, className) => {
      const { from, to } = state.selection;
      let isInOenContainer = false;

      state.doc.nodesBetween(from, to, (node, pos) => {
        if (node.type.name === 'oen_container') {
          isInOenContainer = true;
        }
      });

      if (isInOenContainer) {
        const { $from, $to } = state.selection;
        const range = $from.blockRange($to);
        const target = range && liftTarget(range);
        if (target == null) return false;
        dispatch(state.tr.lift(range, target));
        // const wrapping =
        //   range &&
        //   findWrapping(range, state.config.schema.nodes.oen_container, {
        //     class: className,
        //   });
        // if (!wrapping) return false;
        // if (dispatch) dispatch(state.tr.wrap(range, wrapping).scrollIntoView());
      } else {
        const node = className === 'section' ? 'oen_section' : 'oen_container';

        wrapIn(state.config.schema.nodes[node], { class: className })(
          state,
          dispatch,
        );
      }
    };
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

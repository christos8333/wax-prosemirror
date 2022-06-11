import { injectable } from 'inversify';
import { wrapIn } from 'prosemirror-commands';
import { NodeSelection } from 'prosemirror-state';
import { Mapping, RemoveMarkStep, ReplaceStep } from 'prosemirror-transform';
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
      let OENContainer = '';
      let position = 0;
      state.doc.nodesBetween(from, to, (node, pos) => {
        if (node.type.name === 'oen_container') {
          isInOenContainer = true;
          OENContainer = node;
          position = pos;
          console.log(pos);
        }
      });

      if (isInOenContainer) {
        const map = new Mapping();
        const newNode = JSON.parse(JSON.stringify(OENContainer));
        OENContainer.attrs.class = className;
        console.log('replace', OENContainer);
        newNode.attrs = {
          ...newNode.attrs,
          class: className,
        };
        console.log(newNode);
        state.tr.setSelection(NodeSelection.create(state.doc, position));
        state.tr.replaceSelectionWith(OENContainer);
        // state.tr.setNodeMarkup(map.map(position), null, {
        //   ...OENContainer.attrs,
        //   class: className,
        // });
        dispatch(state.tr);
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

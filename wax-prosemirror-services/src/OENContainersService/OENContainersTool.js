import { injectable } from 'inversify';
import { wrapIn } from 'prosemirror-commands';
import Tools from '../lib/Tools';

@injectable()
export default class OENContainersTool extends Tools {
  title = '';
  icon = '';
  name = 'OENContainersTool';

  get run() {
    return (state, dispatch, className) => {
      if (className !== 'section') {
        wrapIn(state.config.schema.nodes.oen_container, { class: className })(
          state,
          dispatch,
        );
      } else {
        wrapIn(state.config.schema.nodes.oen_section, { class: className })(
          state,
          dispatch,
        );
      }

      console.log(className);
    };
  }

  select = (state, activeViewId) => {
    return true;
  };

  get enable() {
    return state => {
      return true;
    };
  }
}

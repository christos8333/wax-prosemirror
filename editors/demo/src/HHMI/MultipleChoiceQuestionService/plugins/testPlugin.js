import { Plugin, PluginKey } from 'prosemirror-state';
import {
  createReactNodeView,
  useReactNodeViewPortals,
} from 'wax-prosemirror-core/src/WaxContext';
import TestComponent from '../components/TestComponent';

console.log(useReactNodeViewPortals);
const testPlugin = new PluginKey('testPlugin');

export default props => {
  return new Plugin({
    key: testPlugin,
    state: {
      init: (_, state) => {
        console.log('in init');
      },
      apply(tr, prev, _, newState) {
        console.log('in apply');
      },
    },
    props: {
      nodeViews: {
        multiple_choice(node, view, getPos, decorations) {
          console.log('rerenders for ever');
          return createReactNodeView({
            node,
            view,
            getPos,
            decorations,
            component: TestComponent,
            onCreatePortal: handleCreatePortal,
          });
        },
      },
    },
  });
};

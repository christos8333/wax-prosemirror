import { result, find } from 'lodash';

const checkLevelFromConfig = (state, activeViewId, config) => {
  let level = 0;
  const { from, to } = state.selection;
  state.doc.nodesBetween(from, to, (node, pos) => {
    if (node.type.name === 'oen_container') {
      config.forEach(group => {
        const a = result(
          find(group.items, item => {
            return item.className === node.attrs.class;
          }),
          'headingLevel',
        );
        if (a) level = a;
      });
    }
  });
  return level;
};

export default checkLevelFromConfig;

import { result, find } from 'lodash';

const checkLevelFromConfig = (state, activeViewId, config) => {
  let level = 0;
  let isNested = false;
  let hasHeadingLevel = false;
  let count = 0;
  let sectionLevel = 0;
  const { from, to } = state.selection;

  state.doc.nodesBetween(from, to, (node, pos) => {
    if (node.type.name === 'oen_section') {
      isNested = true;
      count += 1;
    }
    if (node.type.name === 'oen_container') {
      count += 1;
    }
  });

  const levelToSeatch = isNested ? 'nestedHeadingLevel' : 'headingLevel';
  state.doc.nodesBetween(from, to, (node, pos) => {
    if (node.type.name === 'oen_section' && count === 1) {
      config.forEach(group => {
        const headingLevel = result(
          find(group.items, item => {
            return item.className === node.attrs.class;
          }),
          'headingLevel',
        );
        if (headingLevel) sectionLevel = headingLevel;
      });
      node.content.content.forEach(childNode => {
        if (childNode.type.name === `heading${sectionLevel}`)
          hasHeadingLevel = true;
      });
    } else if (node.type.name === 'oen_container') {
      config.forEach(group => {
        const headingLevel = result(
          find(group.items, item => {
            return item.className === node.attrs.class;
          }),
          levelToSeatch,
        );
        if (headingLevel) level = headingLevel;
      });
      node.content.content.forEach(childNode => {
        if (childNode.type.name === `heading${level}`) hasHeadingLevel = true;
      });
    }
  });
  if (sectionLevel > 0) {
    return hasHeadingLevel ? sectionLevel + 1 : sectionLevel;
  }
  return hasHeadingLevel ? level + 1 : level;
};

export default checkLevelFromConfig;

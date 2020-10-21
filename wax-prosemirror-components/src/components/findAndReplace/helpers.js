import { each } from 'lodash';

const findMatches = (doc, searchValue) => {
  const results = [];
  const mergedTextNodes = [];
  let index = 0;

  doc.descendants((node, pos) => {
    if (node.isText) {
      if (mergedTextNodes[index]) {
        mergedTextNodes[index] = {
          text: mergedTextNodes[index].text + node.text,
          pos: mergedTextNodes[index].pos,
        };
      } else {
        mergedTextNodes[index] = {
          text: node.text,
          pos,
        };
      }
    } else {
      index += 1;
    }
  });

  mergedTextNodes.forEach(({ text, pos }) => {
    const search = RegExp(searchValue, 'gui');
    let m;
    // eslint-disable-next-line no-cond-assign
    while ((m = search.exec(text))) {
      if (m[0] === '') {
        break;
      }

      results.push({
        from: pos + m.index,
        to: pos + m.index + m[0].length,
      });
    }
  });
  return results;
};

const splitViews = views => {
  each(views, (singleView, viewId) => {
    console.log(singleView, viewId);
  });
};

export default { findMatches, splitViews };

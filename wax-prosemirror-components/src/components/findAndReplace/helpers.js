import { each, eachRight } from 'lodash';

const findMatches = (doc, searchValue) => {
  const allNodes = [];

  doc.descendants((node, pos) => {
    allNodes.push({ node, pos });
  });

  eachRight(allNodes, (node, index) => {
    if (node.node.type.name === 'footnote') {
      allNodes.splice(index + 1, node.node.childCount);
    }
  });

  const results = [];
  const mergedTextNodes = [];
  let index = 0;

  allNodes.forEach((node, i) => {
    if (node.node.isText) {
      if (mergedTextNodes[index]) {
        mergedTextNodes[index] = {
          text: mergedTextNodes[index].text + node.node.text,
          pos: mergedTextNodes[index].pos,
        };
      } else {
        mergedTextNodes[index] = {
          text: node.node.text,
          pos: node.pos,
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

const getMatchesByView = (views, searchValue, findAndReplacePlugin) => {
  let allResults = 0;
  each(views, (singleView, viewId) => {
    const results = findMatches(singleView.state.doc, searchValue);
    allResults += results.length;
    findAndReplacePlugin.props.setResults(results);
    singleView.state.tr.setMeta('search', true);
    singleView.dispatch(singleView.state.tr);
    return allResults;
  });
  return allResults;
};

export default { findMatches, getMatchesByView };

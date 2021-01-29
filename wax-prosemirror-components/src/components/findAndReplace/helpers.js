import { each, eachRight } from 'lodash';
import { DocumentHelpers } from 'wax-prosemirror-utilities';
import { TextSelection } from 'prosemirror-state';

const findMatches = (doc, searchValue, matchCase) => {
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
    const search = RegExp(escapeRegExp(searchValue), matchCase ? 'gu' : 'gui');
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

const escapeRegExp = string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const getMatchesByView = (views, searchValue, matchCase) => {
  let allResults = 0;
  each(views, (singleView, viewId) => {
    const results = findMatches(singleView.state.doc, searchValue, matchCase);
    allResults += results.length;
  });
  return allResults;
};

const getAllResultsByView = (view, searchValue, matchCaseSearch) => {
  const allResults = {};

  each(view, (singleView, viewId) => {
    if (!allResults[viewId]) {
      allResults[viewId] = findMatches(
        singleView.state.doc,
        searchValue,
        matchCaseSearch,
      );
    }
  });
  return allResults;
};

const getNotesIds = main => {
  const notesIds = [];
  const notes = DocumentHelpers.findChildrenByType(
    main.state.doc,
    main.state.schema.nodes.footnote,
    true,
  );
  notes.forEach(note => {
    notesIds.push(note.node.attrs.id);
  });
  return notesIds;
};

const getResultsFrom = results => {
  const resultsFrom = {};

  each(results, (result, viewId) => {
    result.forEach(res => {
      if (!resultsFrom[viewId]) {
        resultsFrom[viewId] = [res.from];
      } else {
        resultsFrom[viewId].push(res.from);
      }
    });
  });
  return resultsFrom;
};

const getClosestMatch = (selectionFrom, results, greater = true) => {
  return results.reduce((a, b) => {
    const greaterSmaller = greater ? a > b : a < b;
    const aDiff = Math.abs(a - selectionFrom);
    const bDiff = Math.abs(b - selectionFrom);

    if (aDiff === bDiff) {
      return greaterSmaller ? a : b;
    }
    return bDiff < aDiff ? b : a;
  });
};

const moveToMatch = (view, lastActiveViewId, results, position) => {
  const selectionFrom = new TextSelection(
    view[lastActiveViewId].state.doc.resolve(
      results[lastActiveViewId][position].from,
    ),
  );

  const selectionTo = new TextSelection(
    view[lastActiveViewId].state.doc.resolve(
      results[lastActiveViewId][position].to,
    ),
  );

  view[lastActiveViewId].dispatch(
    view[lastActiveViewId].state.tr.setSelection(
      TextSelection.between(selectionFrom.$anchor, selectionTo.$head),
    ),
  );
  // if (lastActiveViewId === 'main') {
  view[lastActiveViewId].dispatch(
    view[lastActiveViewId].state.tr.scrollIntoView(),
  );
  // }
};

const clearViewSelection = (view, lastActiveViewId) => {
  view[lastActiveViewId].dispatch(
    view[lastActiveViewId].state.tr.setSelection(
      TextSelection.create(view[lastActiveViewId].state.doc, 0),
    ),
  );
};

const findViewWithMatches = (results, view, lastActiveViewId) => {
  const notesIds = getNotesIds(view.main);

  if (lastActiveViewId === 'main') {
    for (let i = 0; i < notesIds.length; i += 1) {
      if (results[notesIds[i]].length > 0) {
        return notesIds[i];
      }
    }
  }

  if (notesIds.indexOf(lastActiveViewId) < notesIds.length - 1) {
    for (let i = 0; i < notesIds.length; i += 1) {
      if (results[notesIds[i]].length > 0) {
        return notesIds[i];
      }
    }
    return 'main';
  }

  if (
    notesIds.indexOf(lastActiveViewId) &&
    notesIds.indexOf(lastActiveViewId) === notesIds.length - 1
  ) {
    return 'main';
  }
  return false;
};

export default {
  findMatches,
  getMatchesByView,
  getAllResultsByView,
  getNotesIds,
  getResultsFrom,
  getClosestMatch,
  moveToMatch,
  clearViewSelection,
  findViewWithMatches,
};

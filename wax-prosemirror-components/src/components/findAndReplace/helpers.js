import { each } from 'lodash';
import { DocumentHelpers } from 'wax-prosemirror-utilities';
import { TextSelection } from 'prosemirror-state';

const getMatchesByView = (views, searchValue, matchCase) => {
  let allResults = 0;
  each(views, (singleView, viewId) => {
    const results = DocumentHelpers.findMatches(
      singleView.state.doc,
      searchValue,
      matchCase,
    );
    allResults += results.length;
  });
  return allResults;
};

const getAllResultsByView = (view, searchValue, matchCaseSearch) => {
  const allResults = {};

  each(view, (singleView, viewId) => {
    if (!allResults[viewId]) {
      allResults[viewId] = DocumentHelpers.findMatches(
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

const findViewWithMatchesForward = (results, view, lastActiveViewId) => {
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

const findViewWithMatchesBackWards = (results, view, lastActiveViewId) => {
  const notesIds = getNotesIds(view.main);
  if (lastActiveViewId === 'main') {
    for (let i = notesIds.length - 1; i > 0; i -= 1) {
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
  getMatchesByView,
  getAllResultsByView,
  getNotesIds,
  getResultsFrom,
  getClosestMatch,
  moveToMatch,
  clearViewSelection,
  findViewWithMatchesForward,
  findViewWithMatchesBackWards,
};

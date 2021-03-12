/* eslint react/prop-types: 0 */
import React, { useState, useContext, useEffect } from 'react';
import { TextSelection } from 'prosemirror-state';
import { WaxContext } from 'wax-prosemirror-core';
import FindComponent from './FindComponent';
import ExpandedFindAndReplaceComponent from './ExpandedFindAndReplaceComponent';
import helpers from './helpers';

let lastActiveViewId;
let lastSelection;

const FindAndReplaceComponent = ({ close }) => {
  const { view, activeViewId } = useContext(WaxContext);
  const [isExpanded, setExpanded] = useState(false);
  const [nonExpandedText, setNonExpandedText] = useState('');
  const [matchCaseOption, setMatchCaseOption] = useState(false);
  const expand = () => {
    setExpanded(true);
  };

  const getNonExpandedText = searcString => {
    setNonExpandedText(searcString);
  };

  const getMatchCaseOption = matchCase => {
    setMatchCaseOption(matchCase);
  };

  useEffect(() => {
    if (view[activeViewId].state.selection.from !== 0) {
      lastSelection = view[activeViewId].state.selection;
      lastActiveViewId = activeViewId;
    }
  }, []);

  const nextInNotes = (notesIds, results, findViewWithMatches) => {
    for (let i = 0; i < notesIds.length; i += 1) {
      if (results[notesIds[i]].length > 0 && notesIds[i] !== lastActiveViewId) {
        helpers.clearViewSelection(view, lastActiveViewId);
        helpers.moveToMatch(view, notesIds[i], results, 0);
        lastActiveViewId = findViewWithMatches;
        lastSelection = view[lastActiveViewId].state.selection;

        break;
      }
    }
  };

  const findNextMatch = (searchValue, matchCaseSearch) => {
    const counter = helpers.getMatchesByView(
      view,
      searchValue,
      matchCaseSearch,
    );
    if (counter === 0) return;

    lastActiveViewId = activeViewId;
    lastSelection = view[activeViewId].state.selection;
    const results = helpers.getAllResultsByView(
      view,
      searchValue,
      matchCaseSearch,
    );
    const resultsFrom = helpers.getResultsFrom(results);
    const notesIds = helpers.getNotesIds(view.main);

    const findViewWithMatches = helpers.findViewWithMatchesForward(
      results,
      view,
      lastActiveViewId,
    );

    /* if no matches are found on focused view */
    if (!resultsFrom[lastActiveViewId]) {
      view[findViewWithMatches].dispatch(
        view[findViewWithMatches].state.tr.setSelection(
          new TextSelection(view[findViewWithMatches].state.tr.doc.resolve(0)),
        ),
      );
      view[findViewWithMatches].focus();
      lastActiveViewId = findViewWithMatches;
      lastSelection = view[lastActiveViewId].state.selection;
    }

    const found = helpers.getClosestMatch(
      lastSelection.from,
      resultsFrom[lastActiveViewId],
    );

    const position = resultsFrom[lastActiveViewId].indexOf(found);
    /* User selection lesser than found */
    if (lastSelection.from < found) {
      helpers.moveToMatch(view, lastActiveViewId, results, position);
    }
    /* User selection greater than found move to next if not already at the end of results for the view */
    if (
      lastSelection.from >= found &&
      position < resultsFrom[lastActiveViewId].length - 1
    ) {
      helpers.moveToMatch(view, lastActiveViewId, results, position + 1);
    }

    /* Last result of the specific view. Move to next view */
    if (
      (lastSelection.from === found &&
        position === resultsFrom[lastActiveViewId].length - 1) ||
      (lastSelection.from >= found &&
        position === resultsFrom[lastActiveViewId].length - 1)
    ) {
      /* End of results in notes move to main if results exist */
      if (
        notesIds.indexOf(lastActiveViewId) === notesIds.length - 1 &&
        results.main.length > 0
      ) {
        setTimeout(() => {
          lastActiveViewId = findViewWithMatches;
          lastSelection = view[lastActiveViewId].state.selection;
        }, 50);
        helpers.moveToMatch(view, 'main', results, 0);
        helpers.clearViewSelection(view, lastActiveViewId);
      } else {
        nextInNotes(notesIds, results, findViewWithMatches);
      }
    }
  };

  const findPreviousMatch = (searchValue, matchCaseSearch) => {
    const counter = helpers.getMatchesByView(
      view,
      searchValue,
      matchCaseSearch,
    );
    if (counter === 0) return;

    lastActiveViewId = activeViewId;
    lastSelection = view[activeViewId].state.selection;
    const results = helpers.getAllResultsByView(
      view,
      searchValue,
      matchCaseSearch,
    );
    const resultsFrom = helpers.getResultsFrom(results);
    const notesIds = helpers.getNotesIds(view.main);

    const findViewWithMatches = helpers.findViewWithMatchesBackWards(
      results,
      view,
      lastActiveViewId,
    );

    /* if no matches are found on focused view */
    if (!resultsFrom[lastActiveViewId]) {
      view[findViewWithMatches].dispatch(
        view[findViewWithMatches].state.tr.setSelection(
          new TextSelection(
            view[findViewWithMatches].state.tr.doc.resolve(
              view[findViewWithMatches].state.doc.content.size,
            ),
          ),
        ),
      );
      view[findViewWithMatches].focus();
      lastActiveViewId = findViewWithMatches;
      lastSelection = view[lastActiveViewId].state.selection;
    }

    const found = helpers.getClosestMatch(
      lastSelection.from,
      resultsFrom[lastActiveViewId],
      false,
    );

    const position = resultsFrom[lastActiveViewId].indexOf(found);

    /* User selection lesser than found */
    if (lastSelection.from > found) {
      helpers.moveToMatch(view, lastActiveViewId, results, position);
    }

    if (lastSelection.from <= found && position !== 0) {
      helpers.moveToMatch(view, lastActiveViewId, results, position - 1);
    }

    if (lastSelection.from === found && position === 0) {
      if (lastActiveViewId === 'main') {
        for (let i = notesIds.length - 1; i >= 0; i -= 1) {
          if (
            results[notesIds[i]].length > 0 &&
            notesIds[i] !== lastActiveViewId
          ) {
            helpers.moveToMatch(
              view,
              notesIds[i],
              results,
              results[notesIds[i]].length - 1,
            );
            lastSelection = view[activeViewId].state.selection;
            lastActiveViewId = activeViewId;
            helpers.clearViewSelection(view, lastActiveViewId);
            break;
          }
        }
      } else if (
        notesIds[notesIds.length - 1] === activeViewId &&
        notesIds.length > 1
      ) {
        for (let i = notesIds.length - 1; i >= 0; i -= 1) {
          if (
            results[notesIds[i]].length > 0 &&
            notesIds[i] !== lastActiveViewId
          ) {
            helpers.moveToMatch(
              view,
              notesIds[i],
              results,
              results[notesIds[i]].length - 1,
            );
            lastSelection = view[activeViewId].state.selection;
            lastActiveViewId = activeViewId;
            helpers.clearViewSelection(view, lastActiveViewId);
            break;
          } else {
            console.log('go to main', lastActiveViewId);
          }
        }
      }
    }
  };

  return isExpanded ? (
    <ExpandedFindAndReplaceComponent
      close={close}
      findNextMatch={findNextMatch}
      findPreviousMatch={findPreviousMatch}
      matchCaseOption={matchCaseOption}
      nonExpandedText={nonExpandedText}
      setMatchCaseValue={getMatchCaseOption}
    />
  ) : (
    <FindComponent
      close={close}
      expand={expand}
      findNextMatch={findNextMatch}
      findPreviousMatch={findPreviousMatch}
      setMatchCaseValue={getMatchCaseOption}
      setPreviousSearcValue={getNonExpandedText}
    />
  );
};

export default FindAndReplaceComponent;

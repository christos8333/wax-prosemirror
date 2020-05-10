/*
This belongs to https://github.com/fiduswriter/fiduswriter
check: https://github.com/fiduswriter/fiduswriter/blob/develop/fiduswriter/document/static/js/modules/editor/track/amend_transaction.js
License included in folder.
*/

import { Selection, TextSelection } from "prosemirror-state";
import {
  ReplaceStep,
  ReplaceAroundStep,
  AddMarkStep,
  RemoveMarkStep,
  Mapping
} from "prosemirror-transform";

import replaceStep from "./helpers/replaceStep";
import replaceAroundStep from "./helpers/replaceAroundStep";
import addMarkStep from "./helpers/addMarkStep";
import removeMarkStep from "./helpers/removeMarkStep";

const trackedTransaction = (tr, state, user) => {
  if (
    !tr.steps.length ||
    (tr.meta &&
      !Object.keys(tr.meta).every(metadata =>
        ["inputType", "uiEvent", "paste"].includes(metadata)
      )) ||
    // don't replace history TRs
    ["historyUndo", "historyRedo"].includes(tr.getMeta("inputType"))
  ) {
    return tr;
  }

  const newTr = state.tr;
  const map = new Mapping();
  const date = Math.floor(Date.now() / 60000);

  tr.steps.forEach(originalStep => {
    const step = originalStep.map(map),
      doc = newTr.doc;
    if (!step) {
      return;
    }

    if (step instanceof ReplaceStep) {
      replaceStep(state, tr, step, newTr, map, doc, user, date);
    }

    if (step instanceof ReplaceAroundStep) {
      replaceAroundStep(state, tr, step, newTr, map, doc, user, date);
    }

    if (step instanceof AddMarkStep) {
      addMarkStep(state, tr, step, newTr, map, doc, user, date);
    }

    if (step instanceof RemoveMarkStep) {
      removeMarkStep(state, tr, step, newTr, map, doc, user, date);
    }
  });

  // We copy the input type meta data from the original transaction.
  if (tr.getMeta("inputType")) {
    newTr.setMeta(tr.getMeta("inputType"));
  }
  if (tr.getMeta("uiEvent")) {
    newTr.setMeta(tr.getMeta("uiEvent"));
  }

  // if (tr.selectionSet) {
  if (
    tr.selection instanceof TextSelection &&
    (tr.selection.from < state.selection.from ||
      tr.getMeta("inputType") === "deleteContentBackward")
  ) {
    const caretPos = map.map(tr.selection.from, -1);
    newTr.setSelection(new TextSelection(newTr.doc.resolve(caretPos)));
  } else {
    const caretPos = map.map(tr.selection.from, -1);
    newTr.setSelection(new TextSelection(newTr.doc.resolve(caretPos)));
    // newTr.setSelection(tr.selection.map(newTr.doc, map));
  }
  // }
  if (tr.storedMarksSet) {
    newTr.setStoredMarks(tr.storedMarks);
  }
  if (tr.scrolledIntoView) {
    newTr.scrollIntoView();
  }

  return newTr;
};

export default trackedTransaction;

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

import { DocumentHelpers } from "wax-prosemirror-utilities";

import replaceStep from "./helpers/replaceStep";
import replaceAroundStep from "./helpers/replaceAroundStep";
import addMarkStep from "./helpers/addMarkStep";
import removeMarkStep from "./helpers/removeMarkStep";

const trackedTransaction = (tr, state, user, group) => {
  if (
    !tr.steps.length ||
    (tr.meta &&
      !Object.keys(tr.meta).every(metadata =>
        ["inputType", "uiEvent", "paste"].includes(metadata)
      )) ||
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

    switch (step.constructor) {
      case ReplaceStep:
        replaceStep(state, tr, step, newTr, map, doc, user, date, group);
        break;
      case ReplaceAroundStep:
        replaceAroundStep(state, tr, step, newTr, map, doc, user, date, group);
        break;
      case AddMarkStep:
        addMarkStep(state, tr, step, newTr, map, doc, user, date, group);
        break;
      case RemoveMarkStep:
        removeMarkStep(state, tr, step, newTr, map, doc, user, date, group);
        break;
    }
  });

  if (tr.getMeta("inputType")) {
    newTr.setMeta(tr.getMeta("inputType"));
  }
  if (tr.getMeta("uiEvent")) {
    newTr.setMeta(tr.getMeta("uiEvent"));
  }

  if (tr.selectionSet) {
    const deletionMarkSchema = state.schema.marks.deletion;
    const deletionMark = DocumentHelpers.findMark(
      state,
      deletionMarkSchema,
      false
    );

    if (
      tr.selection instanceof TextSelection &&
      (tr.selection.from < state.selection.from ||
        tr.getMeta("inputType") === "deleteContentBackward")
    ) {
      const caretPos = map.map(tr.selection.from, -1);
      newTr.setSelection(new TextSelection(newTr.doc.resolve(caretPos)));
    } else if (tr.selection.from > state.selection.from && deletionMark) {
      const caretPos = map.map(deletionMark.to + 1, 1);
      newTr.setSelection(new TextSelection(newTr.doc.resolve(caretPos)));
    } else {
      newTr.setSelection(tr.selection.map(newTr.doc, map));
    }
  } else {
    if (
      state.selection.from - tr.selection.from > 1 &&
      tr.selection.$head.depth > 1
    ) {
      const caretPos = map.map(tr.selection.from - 2, -1);
      newTr.setSelection(new TextSelection(newTr.doc.resolve(caretPos)));
    } else {
      const caretPos = map.map(tr.selection.from, -1);
      newTr.setSelection(new TextSelection(newTr.doc.resolve(caretPos)));
    }
  }
  if (tr.storedMarksSet) {
    newTr.setStoredMarks(tr.storedMarks);
  }
  if (tr.scrolledIntoView) {
    newTr.scrollIntoView();
  }

  return newTr;
};

export default trackedTransaction;

import { TextSelection } from 'prosemirror-state';
import {
  ReplaceStep,
  ReplaceAroundStep,
  AddMarkStep,
  RemoveMarkStep,
  Mapping,
} from 'prosemirror-transform';

import DocumentHelpers from '../document/DocumentHelpers';
import replaceStep from './helpers/replaceStep';
import replaceAroundStep from './helpers/replaceAroundStep';
import addMarkStep from './helpers/addMarkStep';
import removeMarkStep from './helpers/removeMarkStep';

const trackedTransaction = (
  tr,
  state,
  user,
  context,
  group = 'main',
  viewId = 'main',
) => {
  // Don't track table operations
  if (!tr.selectionSet) {
    const $pos = state.selection.$anchor;
    for (let { depth } = $pos; depth > 0; depth -= 1) {
      const node = $pos.node(depth);
      if (node.type.spec.tableRole === 'table') {
        return tr;
      }
    }
  }
  if (
    !tr.steps.length ||
    (tr.meta &&
      !Object.keys(tr.meta).every(meta =>
        [
          'inputType',
          'uiEvent',
          'paste',
          'imagePlaceHolder$',
          'imagePlaceHolder$1',
        ].includes(meta),
      )) ||
    ['AcceptReject', 'Undo', 'Redo'].includes(tr.getMeta('inputType'))
  ) {
    return tr;
  }

  // const group = tr.getMeta('outsideView') ? tr.getMeta('outsideView') : 'main';
  const newTr = state.tr;
  const map = new Mapping();
  const date = Math.floor(Date.now());

  tr.steps.forEach((originalStep, originalStepIndex) => {
    const step = originalStep.map(map);
    const { doc } = newTr;
    if (!step) return;
    switch (step.constructor) {
      case ReplaceStep:
        replaceStep(
          state,
          tr,
          step,
          newTr,
          map,
          doc,
          user,
          date,
          group,
          viewId,
          originalStep,
          originalStepIndex,
        );
        break;
      case ReplaceAroundStep:
        replaceAroundStep(
          state,
          tr,
          step,
          newTr,
          map,
          doc,
          user,
          date,
          group,
          viewId,
          originalStep,
          originalStepIndex,
        );
        break;
      case AddMarkStep:
        addMarkStep(
          state,
          tr,
          step,
          newTr,
          map,
          doc,
          user,
          date,
          group,
          viewId,
        );
        break;
      case RemoveMarkStep:
        removeMarkStep(
          state,
          tr,
          step,
          newTr,
          map,
          doc,
          user,
          date,
          group,
          viewId,
        );
        break;
      default:
    }
  });

  if (tr.getMeta('inputType')) newTr.setMeta(tr.getMeta('inputType'));

  if (tr.getMeta('uiEvent')) newTr.setMeta(tr.getMeta('uiEvent'));

  if (tr.selectionSet) {
    const deletionMarkSchema = state.schema.marks.deletion;
    const deletionMark = DocumentHelpers.findMark(
      state,
      deletionMarkSchema,
      false,
    );

    if (
      tr.selection instanceof TextSelection &&
      (tr.selection.from < state.selection.from ||
        tr.getMeta('inputType') === 'backwardsDelete')
    ) {
      const caretPos = map.map(tr.selection.from, -1);
      newTr.setSelection(new TextSelection(newTr.doc.resolve(caretPos)));
    } else if (tr.selection.from > state.selection.from && deletionMark) {
      const caretPos = map.map(deletionMark.to + 1, 1);
      newTr.setSelection(new TextSelection(newTr.doc.resolve(caretPos)));
    } else {
      newTr.setSelection(tr.selection.map(newTr.doc, map));
    }
  } else if (
    state.selection.from - tr.selection.from > 1 &&
    tr.selection.$head.depth > 1
  ) {
    const caretPos = map.map(tr.selection.from - 2, -1);
    newTr.setSelection(new TextSelection(newTr.doc.resolve(caretPos)));
  } else {
    if (
      state.selection.from === state.selection.to &&
      tr.selection.$head.depth > 1 &&
      state.selection.from - tr.selection.from === 1
    ) {
      tr.steps.forEach(originalStep => {
        const step = originalStep.map(map);
        step.from += 1;
        step.to += 1;
        const { doc } = newTr;

        replaceStep(state, tr, step, newTr, map, doc, user, date, group);
      });
      const caretPos = map.map(tr.selection.from - 1, -1);
      newTr.setSelection(new TextSelection(newTr.doc.resolve(caretPos)));
    } else if (state.selection.from === state.selection.to) {
      const caretPos = map.map(tr.selection.from, -1);
      newTr.setSelection(new TextSelection(newTr.doc.resolve(caretPos)));
    }
    const slice = map.slice(newTr.selection.from, newTr.selection.to);
    map.appendMap(slice);
  }

  if (tr.storedMarksSet) newTr.setStoredMarks(tr.storedMarks);

  if (tr.scrolledIntoView) newTr.scrollIntoView();

  console.log(tr.meta);
  const imagePlaceholder = context.app.PmPlugins.get('imagePlaceHolder');
  return newTr.setMeta(imagePlaceholder, { remove: { id: {} } });
};

export default trackedTransaction;

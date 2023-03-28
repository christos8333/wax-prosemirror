import { ReplaceStep } from 'prosemirror-transform';
import DocumentHelpers from '../../document/DocumentHelpers';

import markDeletion from './markDeletion';
import markInsertion from './markInsertion';

const replaceStep = (
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
) => {
  const deletionMarkSchema = state.schema.marks.deletion;
  const deletionMark = DocumentHelpers.findMark(
    state,
    deletionMarkSchema,
    false,
  );
  const positionTo = deletionMark ? deletionMark.to : step.to;

  const newStep = new ReplaceStep(
    positionTo, // We insert all the same steps, but with "from"/"to" both set to "to" in order not to delete content. Mapped as needed.
    positionTo,
    step.slice,
    step.structure,
  );

  // We didn't apply the original step in its original place. We adjust the map accordingly.
  const invertStep = originalStep.invert(tr.docs[originalStepIndex]).map(map);
  map.appendMap(invertStep.getMap());
  // map.appendMap(step.invert(doc).getMap());
  if (newStep) {
    const trTemp = state.apply(newTr).tr;
    if (trTemp.maybeStep(newStep).failed) {
      return;
    }
    const mappedNewStepTo = newStep.getMap().map(newStep.to);

    markInsertion(
      trTemp,
      newStep.from,
      mappedNewStepTo,
      user,
      date,
      group,
      viewId,
    );
    // We condense it down to a single replace step.
    const condensedStep = new ReplaceStep(
      newStep.from,
      newStep.to,
      trTemp.doc.slice(newStep.from, mappedNewStepTo),
    );

    newTr.step(condensedStep);
    const mirrorIndex = map.maps.length - 1;
    map.appendMap(condensedStep.getMap(), mirrorIndex);
    if (!newTr.selection.eq(trTemp.selection)) {
      newTr.setSelection(trTemp.selection);
    }
  }
  if (step.from !== step.to) {
    map.appendMap(markDeletion(newTr, step.from, step.to, user, date, group));
  }
};

export default replaceStep;

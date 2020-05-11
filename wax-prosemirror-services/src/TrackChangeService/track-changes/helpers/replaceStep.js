import { ReplaceStep } from "prosemirror-transform";
import { CellSelection } from "prosemirror-tables";
import { DocumentHelpers } from "wax-prosemirror-utilities";

import markDeletion from "./markDeletion";
import markInsertion from "./markInsertion";

const replaceStep = (state, tr, step, newTr, map, doc, user, date) => {
  const cellDeleteTr =
    ["deleteContentBackward", "deleteContentForward"].includes(
      tr.getMeta("inputType")
    ) && state.selection instanceof CellSelection;

  // if deletion mark move to the end of deletion
  const deletionMarkSchema = state.schema.marks.deletion;
  const deletionMark = DocumentHelpers.findMark(
    state,
    deletionMarkSchema,
    false
  );
  const positionTo = deletionMark ? deletionMark.to : step.to;

  const newStep = !cellDeleteTr
    ? new ReplaceStep(
        positionTo, // We insert all the same steps, but with "from"/"to" both set to "to" in order not to delete content. Mapped as needed.
        positionTo,
        step.slice,
        step.structure
      )
    : false;
  // We didn't apply the original step in its original place. We adjust the map accordingly.
  map.appendMap(step.invert(doc).getMap());
  if (newStep) {
    const trTemp = state.apply(newTr).tr;
    if (trTemp.maybeStep(newStep).failed) {
      return;
    }
    const mappedNewStepTo = newStep.getMap().map(newStep.to);

    markInsertion(trTemp, newStep.from, mappedNewStepTo, user, date);
    // We condense it down to a single replace step.
    const condensedStep = new ReplaceStep(
      newStep.from,
      newStep.to,
      trTemp.doc.slice(newStep.from, mappedNewStepTo)
    );

    newTr.step(condensedStep);
    const mirrorIndex = map.maps.length - 1;
    map.appendMap(condensedStep.getMap(), mirrorIndex);
    if (!newTr.selection.eq(trTemp.selection)) {
      newTr.setSelection(trTemp.selection);
    }
  }
  if (step.from !== step.to) {
    map.appendMap(markDeletion(newTr, step.from, step.to, user, date));
  }
};

export default replaceStep;

import { ReplaceStep } from "prosemirror-transform";
import { CellSelection } from "prosemirror-tables";

import markDeletion from "./markDeletion";
import markInsertion from "./markInsertion";

const replaceStep = (state, tr, step, newTr, map, doc, user, date) => {
  // We only insert content if this is not directly a tr for cell deletion. This is because tables delete rows by deleting the
  // contents of each cell and replacing it with an empty paragraph.
  const cellDeleteTr =
    ["deleteContentBackward", "deleteContentForward"].includes(
      tr.getMeta("inputType")
    ) && state.selection instanceof CellSelection;

  const newStep = !cellDeleteTr
    ? new ReplaceStep(
        step.to, // We insert all the same steps, but with "from"/"to" both set to "to" in order not to delete content. Mapped as needed.
        step.to,
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

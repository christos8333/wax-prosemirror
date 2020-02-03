import { Selection, TextSelection } from "prosemirror-state";
import { Slice } from "prosemirror-model";
import {
  ReplaceStep,
  ReplaceAroundStep,
  AddMarkStep,
  RemoveMarkStep,
  Mapping
} from "prosemirror-transform";
import { CellSelection } from "prosemirror-tables";

import markDeletion from "./markDeletion";
import markInsertion from "./markInsertion";
import markWrapping from "./markWrapping";

const trackedTransaction = (tr, state, currentUser) => {
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
  const user = currentUser.userId,
    approved = false,
    // !editor.view.state.doc.firstChild.attrs.tracked &&
    // editor.docInfo.access_rights !== "write-tracked",
    newTr = state.tr,
    map = new Mapping(),
    exactDate = Date.now(),
    date10 = Math.floor(exactDate / 600000) * 10, // 10 minute interval
    date1 = Math.floor(exactDate / 60000), // 1 minute interval
    username = currentUser.username,
    // We only insert content if this is not directly a tr for cell deletion. This is because tables delete rows by deleting the
    // contents of each cell and replacing it with an empty paragraph.
    cellDeleteTr =
      ["deleteContentBackward", "deleteContentForward"].includes(
        tr.getMeta("inputType")
      ) && state.selection instanceof CellSelection;

  tr.steps.forEach(originalStep => {
    const step = originalStep.map(map),
      doc = newTr.doc;
    if (!step) {
      return;
    }

    //if (step instanceof ReplaceStep) {
    if (step.jsonID === "replace") {
      const newStep = approved
        ? step
        : step.slice.size && !cellDeleteTr
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
        markInsertion(
          trTemp,
          newStep.from,
          mappedNewStepTo,
          user,
          username,
          date1,
          date10,
          approved
        );
        // We condense it down to a single replace step.
        const condensedStep = new ReplaceStep(
          newStep.from,
          newStep.to,
          trTemp.doc.slice(newStep.from, mappedNewStepTo)
        );

        newTr.step(condensedStep);
        map.appendMap(condensedStep.getMap());
        if (!newTr.selection.eq(trTemp.selection)) {
          newTr.setSelection(trTemp.selection);
        }
      }
      if (!approved && step.from !== step.to) {
        map.appendMap(
          markDeletion(newTr, step.from, step.to, user, username, date1, date10)
        );
      }
    } else if (approved) {
      newTr.step(step);
    } else if (step instanceof ReplaceAroundStep) {
      if (step.from === step.gapFrom && step.to === step.gapTo) {
        // wrapped in something
        newTr.step(step);
        const from = step.getMap().map(step.from, -1);
        const to = step.getMap().map(step.gapFrom);
        markInsertion(newTr, from, to, user, username, date1, date10, false);
      } else if (!step.slice.size) {
        // unwrapped from something
        map.appendMap(step.invert(doc).getMap());
        map.appendMap(
          markDeletion(
            newTr,
            step.from,
            step.gapFrom,
            user,
            username,
            date1,
            date10
          )
        );
      } else if (
        step.slice.size === 2 &&
        step.gapFrom - step.from === 1 &&
        step.to - step.gapTo === 1
      ) {
        // Replaced one wrapping with another
        newTr.step(step);
        const oldNode = doc.nodeAt(step.from);
        if (oldNode.attrs.track) {
          markWrapping(
            newTr,
            step.from,
            oldNode,
            step.slice.content.firstChild,
            user,
            username,
            date1
          );
        }
      } else {
        newTr.step(step);
        const ranges = [
          {
            from: step.getMap().map(step.from, -1),
            to: step.getMap().map(step.gapFrom)
          },
          {
            from: step.getMap().map(step.gapTo, -1),
            to: step.getMap().map(step.to)
          }
        ];
        ranges.forEach(range =>
          doc.nodesBetween(range.from, range.to, (node, pos) => {
            if (pos < range.from) {
              return true;
            }
            markInsertion(
              newTr,
              range.from,
              range.to,
              user,
              username,
              date1,
              date10,
              false
            );
          })
        );
      }
    } else if (step instanceof AddMarkStep) {
      doc.nodesBetween(step.from, step.to, (node, pos) => {
        if (!node.isInline) {
          return true;
        }
        if (node.marks.find(mark => mark.type.name === "deletion")) {
          return false;
        } else {
          newTr.addMark(
            Math.max(step.from, pos),
            Math.min(step.to, pos + node.nodeSize),
            step.mark
          );
        }
        if (!node.marks.find(mark => mark.type === step.mark.type)) {
          const formatChangeMark = node.marks.find(
            mark => mark.type.name === "format_change"
          );
          let after, before;
          if (formatChangeMark) {
            if (formatChangeMark.attrs.before.includes(step.mark.type.name)) {
              before = formatChangeMark.attrs.before.filter(
                markName => markName !== step.mark.type.name
              );
              after = formatChangeMark.attrs.after;
            } else {
              before = formatChangeMark.attrs.before;
              after = formatChangeMark.attrs.after.concat(step.mark.type.name);
            }
          } else {
            before = [];
            after = [step.mark.type.name];
          }
          if (after.length || before.length) {
            newTr.addMark(
              Math.max(step.from, pos),
              Math.min(step.to, pos + node.nodeSize),
              state.schema.marks.format_change.create({
                user,
                username,
                date: date10,
                before,
                after
              })
            );
          } else if (formatChangeMark) {
            newTr.removeMark(
              Math.max(step.from, pos),
              Math.min(step.to, pos + node.nodeSize),
              formatChangeMark
            );
          }
        }
      });
    } else if (step instanceof RemoveMarkStep) {
      doc.nodesBetween(step.from, step.to, (node, pos) => {
        if (!node.isInline) {
          return true;
        }
        if (node.marks.find(mark => mark.type.name === "deletion")) {
          return false;
        } else {
          newTr.removeMark(
            Math.max(step.from, pos),
            Math.min(step.to, pos + node.nodeSize),
            step.mark
          );
        }
        if (node.marks.find(mark => mark.type === step.mark.type)) {
          const formatChangeMark = node.marks.find(
            mark => mark.type.name === "format_change"
          );
          let after, before;
          if (formatChangeMark) {
            if (formatChangeMark.attrs.after.includes(step.mark.type.name)) {
              after = formatChangeMark.attrs.after.filter(
                markName => markName !== step.mark.type.name
              );
              before = formatChangeMark.attrs.before;
            } else {
              after = formatChangeMark.attrs.after;
              before = formatChangeMark.attrs.before.concat(
                step.mark.type.name
              );
            }
          } else {
            after = [];
            before = [step.mark.type.name];
          }
          if (after.length || before.length) {
            newTr.addMark(
              Math.max(step.from, pos),
              Math.min(step.to, pos + node.nodeSize),
              state.schema.marks.format_change.create({
                user,
                username,
                date: date10,
                before,
                after
              })
            );
          } else if (formatChangeMark) {
            newTr.removeMark(
              Math.max(step.from, pos),
              Math.min(step.to, pos + node.nodeSize),
              formatChangeMark
            );
          }
        }
      });
    }
  });

  // copy the input type meta data from the original transaction.
  if (tr.getMeta("inputType")) {
    newTr.setMeta(tr.getMeta("inputType"));
  }
  if (tr.getMeta("uiEvent")) {
    newTr.setMeta(tr.getMeta("uiEvent"));
  }

  if (tr.selectionSet) {
    if (
      tr.selection instanceof TextSelection &&
      (tr.selection.from < state.selection.from ||
        tr.getMeta("inputType") === "deleteContentBackward")
    ) {
      const caretPos = map.map(tr.selection.from, -1);
      newTr.setSelection(new TextSelection(newTr.doc.resolve(caretPos)));
    } else {
      newTr.setSelection(tr.selection.map(newTr.doc, map));
    }
  }
  if (tr.storedMarksSet) {
    newTr.setStoredMarks(tr.storedMarks);
  }
  if (tr.scrolledIntoView) {
    newTr.scrollIntoView();
    if (
      tr.selection instanceof TextSelection &&
      tr.selection.from < state.selection.from
    ) {
      const caretPos = map.map(tr.selection.from, -1);
      newTr.setSelection(new TextSelection(newTr.doc.resolve(caretPos)));
    }
  }
  return newTr;
};

export default trackedTransaction;

import { Selection, TextSelection } from "prosemirror-state";
import { Slice } from "prosemirror-model";
import { ReplaceStep, Mapping } from "prosemirror-transform";

const markDeletion = (tr, from, to, user, date1, date10) => {
  const deletionMark = tr.doc.type.schema.marks.deletion.create({
    user: user.userId,
    username: user.username,
    date: date10
  });
  let firstTableCellChild = false;
  const deletionMap = new Mapping();
  // Add deletion mark to block nodes (figures, text blocks) and find already deleted inline nodes (and leave them alone)
  tr.doc.nodesBetween(from, to, (node, pos) => {
    if (pos < from && node.type.name === "table_cell") {
      firstTableCellChild = true;
      return true;
    } else if ((pos < from && node.isBlock) || firstTableCellChild) {
      firstTableCellChild = false;
      return true;
    } else if (["table_row", "table_cell"].includes(node.type.name)) {
      return false;
    } else if (
      node.isInline &&
      node.marks.find(
        mark =>
          mark.type.name === "insertion" &&
          mark.attrs.user === user.userId &&
          !mark.attrs.approved
      )
    ) {
      const removeStep = new ReplaceStep(
        deletionMap.map(Math.max(from, pos)),
        deletionMap.map(Math.min(to, pos + node.nodeSize)),
        Slice.empty
      );
      if (!tr.maybeStep(removeStep).failed) {
        deletionMap.appendMap(removeStep.getMap());
      }
    } else if (
      node.isInline &&
      !node.marks.find(mark => mark.type.name === "deletion")
    ) {
      tr.addMark(
        deletionMap.map(Math.max(from, pos)),
        deletionMap.map(Math.min(to, pos + node.nodeSize)),
        deletionMark
      );
    } else if (
      node.attrs.track &&
      !node.attrs.track.find(trackAttr => trackAttr.type === "deletion") &&
      !["bullet_list", "ordered_list"].includes(node.type.name)
    ) {
      if (
        node.attrs.track.find(
          trackAttr =>
            trackAttr.type === "insertion" && trackAttr.user === user.userId
        )
      ) {
        let removeStep;
        // user has created element. so (s)he is allowed to delete it again.
        if (node.isTextblock && to < pos + node.nodeSize) {
          // The node is a textblock. So we need to merge into the last possible position inside the last text block.
          const selectionBefore = Selection.findFrom(tr.doc.resolve(pos), -1);
          if (selectionBefore instanceof TextSelection) {
            removeStep = new ReplaceStep(
              deletionMap.map(selectionBefore.$anchor.pos),
              deletionMap.map(to),
              Slice.empty
            );
          }
        } else {
          removeStep = new ReplaceStep(
            deletionMap.map(Math.max(from, pos)),
            deletionMap.map(Math.min(to, pos + node.nodeSize)),
            Slice.empty
          );
        }

        if (!tr.maybeStep(removeStep).failed) {
          deletionMap.appendMap(removeStep.getMap());
        }
      } else {
        const track = node.attrs.track.slice();
        track.push({
          type: "deletion",
          user: user.userId,
          username: user.username,
          date: date1
        });
        tr.setNodeMarkup(
          deletionMap.map(pos),
          null,
          Object.assign({}, node.attrs, { track }),
          node.marks
        );
      }
    }
  });

  return deletionMap;
};

export default markDeletion;

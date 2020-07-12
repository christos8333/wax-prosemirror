import { v4 as uuidv4 } from "uuid";

const addMarkStep = (state, tr, step, newTr, map, doc, user, date, group) => {
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
    if (
      !["comment"].includes(step.mark.type.name) &&
      !node.marks.find(mark => mark.type === step.mark.type)
    ) {
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
        // Math.max(step.from, pos),
        // Math.min(step.to, pos + node.nodeSize),
        newTr.addMark(
          step.from,
          step.to,
          state.schema.marks.format_change.create({
            user: user.userId,
            username: user.username,
            date,
            before,
            after,
            group,
            id: uuidv4()
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
};

export default addMarkStep;

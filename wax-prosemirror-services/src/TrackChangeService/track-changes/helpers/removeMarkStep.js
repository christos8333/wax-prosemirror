const removeMarkStep = (state, tr, step, newTr, map, doc, user, date) => {
  doc.nodesBetween(step.from, step.to, (node, pos) => {
    if (!node.isInline) {
      return true;
    }
    if (node.marks.find(mark => mark.type.name === 'deletion')) {
      return false;
    }
    newTr.removeMark(
      Math.max(step.from, pos),
      Math.min(step.to, pos + node.nodeSize),
      step.mark,
    );

    if (
      ['em', 'strong', 'underline'].includes(step.mark.type.name) &&
      node.marks.find(mark => mark.type === step.mark.type)
    ) {
      const formatChangeMark = node.marks.find(
        mark => mark.type.name === 'format_change',
      );
      let after, before;
      if (formatChangeMark) {
        if (formatChangeMark.attrs.after.includes(step.mark.type.name)) {
          after = formatChangeMark.attrs.after.filter(
            markName => markName !== step.mark.type.name,
          );
          before = formatChangeMark.attrs.before;
        } else {
          after = formatChangeMark.attrs.after;
          before = formatChangeMark.attrs.before.concat(step.mark.type.name);
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
            user: user.userId,
            username: user.username,
            date,
            before,
            after,
          }),
        );
      } else if (formatChangeMark) {
        newTr.removeMark(
          Math.max(step.from, pos),
          Math.min(step.to, pos + node.nodeSize),
          formatChangeMark,
        );
      }
    }
  });
};

export default removeMarkStep;

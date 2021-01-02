import { Selection, TextSelection } from 'prosemirror-state';
import { Slice } from 'prosemirror-model';
import { ReplaceStep, Mapping } from 'prosemirror-transform';

const markDeletion = (tr, from, to, user, date, group, viewId) => {
  const deletionMark = tr.doc.type.schema.marks.deletion.create({
    user: user.userId,
    username: user.username,
    // date
  });

  const deletionMap = new Mapping();

  tr.doc.nodesBetween(from, to, (node, pos) => {
    if (node.type.name.includes('table')) {
      return;
    }
    if (
      node.isInline &&
      node.marks.find(
        mark =>
          mark.type.name === 'insertion' &&
          mark.attrs.user.toString() === user.userId.toString(),
      )
    ) {
      const removeStep = new ReplaceStep(
        deletionMap.map(Math.max(from, pos)),
        deletionMap.map(Math.min(to, pos + node.nodeSize)),
        Slice.empty,
      );
      if (!tr.maybeStep(removeStep).failed) {
        deletionMap.appendMap(removeStep.getMap());
      }
    } else if (
      node.isInline &&
      !node.marks.find(mark => mark.type.name === 'deletion')
    ) {
      tr.addMark(
        deletionMap.map(Math.max(from, pos)),
        deletionMap.map(Math.min(to, pos + node.nodeSize)),
        deletionMark,
      );
    } else if (
      node.attrs.track &&
      !node.attrs.track.find(trackAttr => trackAttr.type === 'deletion') &&
      !['bullet_list', 'ordered_list'].includes(node.type.name)
    ) {
      if (
        node.attrs.track.find(
          trackAttr =>
            trackAttr.type === 'insertion' && trackAttr.user === user.userId,
        )
      ) {
        let removeStep;
        if (node.isTextblock && to < pos + node.nodeSize) {
          const selectionBefore = Selection.findFrom(tr.doc.resolve(pos), -1);
          if (selectionBefore instanceof TextSelection) {
            removeStep = new ReplaceStep(
              deletionMap.map(selectionBefore.$anchor.pos),
              deletionMap.map(to),
              Slice.empty,
            );
          }
        } else {
          removeStep = new ReplaceStep(
            deletionMap.map(Math.max(from, pos)),
            deletionMap.map(Math.min(to, pos + node.nodeSize)),
            Slice.empty,
          );
        }

        if (!tr.maybeStep(removeStep).failed) {
          deletionMap.appendMap(removeStep.getMap());
        }
      }

      let counter = 2;
      node.content.forEach((item, i) => {
        item.marks.forEach(mark => {
          if (mark.type.name === 'deletion') {
            counter += item.nodeSize;
          }
        });
      });

      if (node.content.size === 0 || counter === node.nodeSize) {
        const track = node.attrs.track.slice();
        track.push({
          type: 'deletion',
          user: user.userId,
          username: user.username,
          // date
        });
        tr.setNodeMarkup(
          deletionMap.map(pos),
          null,
          Object.assign(node.attrs.track, { track }),
          node.marks,
        );
      }
    }
  });

  return deletionMap;
};

export default markDeletion;

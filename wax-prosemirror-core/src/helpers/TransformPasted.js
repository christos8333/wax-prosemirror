import { v4 as uuidv4 } from "uuid";
import { DocumentHelpers } from "wax-prosemirror-utilities";

const transformPasted = (slice, view) => {
  const { content } = slice;
  const commentNodes = DocumentHelpers.findChildrenByMark(
    content,
    view.state.schema.marks.comment,
    true
  );

  const notes = DocumentHelpers.findChildrenByType(
    content,
    view.state.schema.nodes.footnote,
    true
  );

  const allComments = commentNodes.map(node => {
    return node.node.marks.filter(comment => {
      return comment.type.name === "comment";
    });
  });

  //TODO check to alter attr with transform
  allComments.forEach(comment => {
    comment[0].attrs.id = uuidv4();
  });

  notes.forEach(note => {
    note.node.attrs.id = uuidv4();
  });

  return slice;
};

export default transformPasted;

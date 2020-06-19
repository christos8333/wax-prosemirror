import { forEach } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { DocumentHelpers } from "wax-prosemirror-utilities";

const transformPasted = (slice, view) => {
  const { content } = slice;
  const commentNodes = DocumentHelpers.findChildrenByMark(
    content,
    view.state.schema.marks.comment,
    true
  );

  const allComments = [];

  commentNodes.map(node => {
    node.node.marks.map(comment => {
      if (comment.type.name === "comment") {
        allComments.push(comment);
      }
    });
  });

  let groupedCommentsById = allComments.reduce((obj, mark) => {
    obj[mark.attrs.id] = [...(obj[mark.attrs.id] || []), mark];
    return obj;
  }, {});

  forEach(Object.keys(groupedCommentsById), key => {
    let id = uuidv4();
    forEach(groupedCommentsById[key], comment => {
      comment.attrs.id = id;
    });
  });

  return slice;
};

export default transformPasted;

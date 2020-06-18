import { minBy, maxBy } from "lodash";
import { Plugin, PluginKey } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";
import { DocumentHelpers } from "wax-prosemirror-utilities";

const activeComment = new PluginKey("activeComment");

const getComment = state => {
  const commentMark = state.schema.marks["comment"];
  const commentOnSelection = DocumentHelpers.findMark(state, commentMark);
  if (commentOnSelection) {
    const allInlineNodes = DocumentHelpers.findInlineNodes(state.doc);
    const allCommentsWithSameId = [];

    allInlineNodes.map(node => {
      node.node.marks.filter(mark => {
        if (
          mark.type.name === "comment" &&
          commentOnSelection.attrs.id === mark.attrs.id
        ) {
          mark.from = node.pos;
          mark.to = node.pos + node.node.text.length;
          allCommentsWithSameId.push(mark);
        }
      });
    });
    if (allCommentsWithSameId.length > 1) {
      const minPos = minBy(allCommentsWithSameId, "from");
      const maxPos = maxBy(allCommentsWithSameId, "to");

      return {
        from: minPos.from,
        to: maxPos.to,
        attrs: commentOnSelection.attrs,
        contained: commentOnSelection.contained
      };
    }
  }

  return commentOnSelection;
};

export default props => {
  return new Plugin({
    key: activeComment,
    state: {
      init: (_, state) => {
        return { comment: getComment(state) };
      },
      apply(tr, prev, _, newState) {
        const comment = getComment(newState);
        let createDecoration;
        if (comment) {
          createDecoration = DecorationSet.create(newState.doc, [
            Decoration.inline(comment.from, comment.to, {
              class: "active-comment"
            })
          ]);
        }
        return {
          comment,
          createDecoration
        };
      }
    },
    props: {
      decorations: state => {
        const commentPluginState = state && activeComment.getState(state);
        return commentPluginState.createDecoration;
      }
    }
  });
};

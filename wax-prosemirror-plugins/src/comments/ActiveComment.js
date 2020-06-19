import { minBy, maxBy, last } from "lodash";
import { Plugin, PluginKey } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";
import { DocumentHelpers } from "wax-prosemirror-utilities";

const activeComment = new PluginKey("activeComment");

const getComment = state => {
  if (state.selection.from !== state.selection.to) return;

  const commentMark = state.schema.marks["comment"];
  const commentOnSelection = DocumentHelpers.findMark(state, commentMark);

  if (commentOnSelection) {
    const commentNodes = DocumentHelpers.findChildrenByMark(
      state.doc,
      commentMark,
      true
    );

    const allCommentsWithSameId = [];
    commentNodes.map(node => {
      node.node.marks.filter(mark => {
        if (
          mark.type.name === "comment" &&
          commentOnSelection.attrs.id === mark.attrs.id
        ) {
          allCommentsWithSameId.push(node);
        }
      });
    });

    if (allCommentsWithSameId.length > 1) {
      const minPos = minBy(allCommentsWithSameId, "pos");
      const maxPos = maxBy(allCommentsWithSameId, "pos");

      return {
        from: minPos.pos,
        to: maxPos.pos + last(allCommentsWithSameId).node.nodeSize,
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

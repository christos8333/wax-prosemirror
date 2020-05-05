import { Plugin, PluginKey } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";
import { Commands, DocumentHelpers } from "wax-prosemirror-utilities";

const activeComment = new PluginKey("activeComment");

const getComment = state => {
  const commentMark = state.schema.marks["comment"];
  return DocumentHelpers.findMark(state, commentMark);
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

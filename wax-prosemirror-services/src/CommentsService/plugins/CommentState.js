/* eslint-disable no-param-reassign */
import { v4 as uuidv4 } from 'uuid';
import { Decoration, DecorationSet } from 'prosemirror-view';
import CommentDecoration from './CommentDecoration';
import { CommentDecorationPluginKey } from './CommentDecorationPlugin';

const randomId = () => {
  return uuidv4();
};

export default class CommentState {
  constructor(options) {
    this.decorations = DecorationSet.empty;
    this.options = options;
  }

  addComment(action) {
    const { map } = this.options;
    const { from, to, data } = action;
    const id = randomId();
    map.set(id, { id, from, to, data });
  }

  updateComment(action) {
    const { map } = this.options;
    const annotationToUpdate = map.get(action.id);
    if (annotationToUpdate) {
      annotationToUpdate.data = action.data;
    }
  }

  deleteComment(id) {
    const { map } = this.options;
    map.delete(id);
  }

  commentsAt(position, to) {
    return this.decorations.find(position, to || position).map(decoration => {
      return new CommentDecoration(decoration);
    });
  }

  allCommentsList() {
    const { map } = this.options;
    return Array.from(map, ([key, value]) => {
      return { ...value, id: key };
    }).filter(value => {
      return 'from' in value && 'to' in value;
    });
  }

  createDecorations(state) {
    const decorations = [];

    this.allCommentsList().forEach(annotation => {
      const { from, to } = annotation;

      decorations.push(
        Decoration.inline(
          from,
          to,
          {
            class: 'comment',
            'data-id': annotation.id,
          },
          {
            id: annotation.id,
            data: annotation,
            inclusiveEnd: true,
          },
        ),
      );
    });
    this.decorations = DecorationSet.create(state.doc, decorations);
  }

  apply(transaction, state) {
    const action = transaction.getMeta(CommentDecorationPluginKey);
    if (action && action.type) {
      if (action.type === 'addComment') {
        this.addComment(action);
      }
      if (action.type === 'updateComment') {
        this.updateComment(action);
      }
      if (action.type === 'deleteComment') {
        this.deleteComment(action.id);
      }
      this.createDecorations(state);
      return this;
    }

    this.options.map.forEach((annotation, _) => {
      if ('from' in annotation && 'to' in annotation) {
        annotation.from = transaction.mapping.map(annotation.from);
        annotation.to = transaction.mapping.map(annotation.to);
      }
    });
    this.createDecorations(state);
    return this;
  }
}

//  let res =
//    annotation.to === state.selection.to &&
//    state.selection.from === state.selection.to;
//  console.log(res, transaction.docChanged);
